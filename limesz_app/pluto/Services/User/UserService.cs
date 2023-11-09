using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using margarita_data.Models;
using Microsoft.IdentityModel.Tokens;
using System.Net;
using margarita_app.Misc;
using System.Security.Cryptography;
using System.Web.Http;
using MongoDB.Driver;
using margarita_app.Services.Database;
using margarita_app.Models.Auth;
using margarita_app.Services.RoleGrantService;
using pluto.PlutoRepo;
using SendGrid.Helpers.Mail;

namespace margarita_app.Services
{

    public class UserService: MongoBaseRepositoryImpl<User>, IUserService
	{
        private static UserService _instance;
        public static UserService instance => _instance;
        private readonly EmailService.EmailService _emailService;

        public UserService(IMongoDatabaseService mongoDatabaseService, EmailService.EmailService emailService) : base(mongoDatabaseService)
        {
            if (_instance == null) _instance = this;
            this._emailService = emailService;
        }

        protected override string CollectionName => "Users";

        public AuthResult AuthenticateUser(string email, string password)
        {
            var user = _collection.Find(u => u.Email == email).FirstOrDefault();
            if (user == null)
                throw new HttpResponseException(HttpStatusCode.Forbidden);

            ValidateUserPassword(password, user.Password);
            return GenerateTokens(user);
        }

        public AuthResult RefreshUserToken(string token)
        {
            string tokenHash = GetTokenHash(token);
            var user = _collection.Find(u => u.RefreshTokenKeys.Any(t => t.TokenHash == tokenHash && t.Validity > DateTime.UtcNow)).FirstOrDefault();
            if (user == null)
            {
                  throw new HttpResponseException(HttpStatusCode.Forbidden);
            }

            user.RefreshTokenKeys = user.RefreshTokenKeys.Where(k => k.Validity > DateTime.UtcNow && k.TokenHash != tokenHash).ToList();
            Update(user);

            return GenerateTokens(user);
        }

        private AuthResult GenerateTokens(User user)
        {
            var accessTokenExpires = DateTime.UtcNow.AddHours(1);
            var accessToken = GenerateAccessToken(user.Email, user.Id!, accessTokenExpires);
            var refreshTokenExpires = DateTime.UtcNow.AddDays(60);
            var refreshToken = GenerateAndSaveRefreshToken(user.Email, refreshTokenExpires);

            return new AuthResult() { AccessToken = accessToken, AccessTokenValidty = accessTokenExpires, RefreshToken = refreshToken, RefreshTokenValidity = refreshTokenExpires };
        }

        private string GenerateAndSaveRefreshToken(string userEmail, DateTime expire)
        {
            var token = Guid.NewGuid().ToString();
            var user = this.GetUserByEmail(userEmail);
            var tokenHash = GetTokenHash(token);
           
            user!.RefreshTokenKeys.Add(new TokenKey() { TokenHash = tokenHash, Validity = expire });
            Update(user);

            return token;
        }

        private string GenerateAccessToken(string email, string id, DateTime expires)
        {
            var issuer = PlutoConfig.Instance!.Jwt!.Issuer;
            var audience = PlutoConfig.Instance!.Jwt!.Audience;
            var key = Encoding.ASCII.GetBytes(PlutoConfig.Instance!.Jwt!.Key!);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("Id", id.ToString()),
                    new Claim("Email", email),
                    new Claim(JwtRegisteredClaimNames.Sub, email),
                    new Claim(JwtRegisteredClaimNames.Email, email),
                    new Claim(JwtRegisteredClaimNames.Jti,
                        Guid.NewGuid().ToString())
                }),
                Expires = expires,
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials
                (new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha512Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);
            var stringToken = tokenHandler.WriteToken(token);
            return stringToken;
        }

        private void ValidateUserPassword(string password, string savedPasswordHash)
        {
            /* Extract the bytes */
            byte[] hashBytes = Convert.FromBase64String(savedPasswordHash);

            /* Get the salt */
            byte[] salt = new byte[16];
            Array.Copy(hashBytes, 0, salt, 0, 16);

            /* Compute the hash on the password the user entered */
            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 100000);
            byte[] hash = pbkdf2.GetBytes(20);

            /* Compare the results */
            for (int i = 0; i < 20; i++)
                if (hashBytes[i + 16] != hash[i])
                    throw new HttpResponseException(HttpStatusCode.Forbidden);
        }

        private string GetTokenHash(string token)
        {
            using HashAlgorithm algorithm = SHA256.Create();
                var hash = algorithm.ComputeHash(Encoding.UTF8.GetBytes(token));
            

            return Convert.ToBase64String(hash);
        }

        private void CreateUserRecord(string email, string username, string password)
        {
            byte[] salt;
            string savedPasswordHash;
            ExcryptUserPassword(password, out salt, out savedPasswordHash);
            var user = new User
            {
                Username = username,
                Email = email,
                EmailVerifyed = false,
                RegistrationDate = DateTime.Now,
                LastLogin = DateTime.Now,
                PasswordSalt = salt,
                Password = savedPasswordHash
            };

            _collection.InsertOne(user);
        }

        public User? GetUserByEmail(string email) => this.Get(u => u.Email == email).FirstOrDefault();
        public User? GetUserById(string id) => this.Get(u => u.Id == id).FirstOrDefault();

        public void RegisterUser(string username, string email, string password)
        {
            var user = _collection.Find(u => u.Email == email).FirstOrDefault();
            if (user != null)
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            CreateUserRecord(email, username, password);
        }
        public void DeleteUserAccount(string email)
        {
            var user = GetUserByEmail(email);
            if (user == null) throw new System.Web.Http.HttpResponseException(HttpStatusCode.NotFound);
            Remove(user.Id!);
        }

        public async Task CreatePasswordResetToken(string email, string queryParams)
        {
            var user = this.GetUserByEmail(email);
            if (user == null) throw new HttpResponseException(HttpStatusCode.NotFound);

            var token = Guid.NewGuid().ToString();

            bool passwordSendResult = await SendPasswordResetEmail(email, token, queryParams);
            if (!passwordSendResult) throw new HttpResponseException(HttpStatusCode.NotFound);

            var passwordResetToken = new PasswordResetToken
            {
                Token = GetTokenHash(token),
                ExpirationDate = DateTime.Now.AddMinutes(30)
            };
            user.PasswordResetToken = passwordResetToken;
            Update(user);
        }

        public AuthResult UsePasswordResetToken(string token, string newPassword)
        {
            var tokenHash = GetTokenHash(token);
            var user = Get(u => u.PasswordResetToken != null && u.PasswordResetToken.Token == tokenHash && u.PasswordResetToken.ExpirationDate > DateTime.UtcNow).FirstOrDefault();
            if (user == null) throw new HttpResponseException(HttpStatusCode.NotFound);

            byte[] salt;
            string passwordHash;
            ExcryptUserPassword(newPassword, out salt, out passwordHash);

            user.PasswordSalt = salt;
            user.Password = passwordHash;
            user.PasswordResetToken = null;
            Update(user);
            return GenerateTokens(user);
        }

        private static void ExcryptUserPassword(string password, out byte[] salt, out string savedPasswordHash)
        {
            RNGCryptoServiceProvider.Create().GetBytes(salt = new byte[16]);

            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 100000);
            byte[] hash = pbkdf2.GetBytes(20);

            byte[] hashBytes = new byte[36];
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 20);

            savedPasswordHash = Convert.ToBase64String(hashBytes);
        }

        private async Task<bool> SendPasswordResetEmail(string email, string token, string? queryParams)
        {
            var tokenLink = token;
            Dictionary<string, string> variables = new Dictionary<string, string>() 
            {
                { "TOKEN_LINK", $"{PlutoConfig.Instance.HostNameForEmails}/password-reset/{token}/{queryParams??""}" }
            };
            var result = await _emailService.SendEmail(new EmailAddress("noreply@margareta.app", "Margareta.app"), new EmailAddress() { Email = email }, "Password reset", token, "password-reset.html", variables);
            return result.IsSuccessStatusCode;
        }
    }
}

