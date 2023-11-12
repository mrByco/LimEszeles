using Pluto.Models.Auth;

namespace pluto.Services.User;

public interface IUserService
{
    AuthResult AuthenticateUser(string credentialsEmail, string credentialsPassword);
    void RegisterUser(string registrationDataUsername, string registrationDataEmail, string registrationDataPassword);
    AuthResult RefreshUserToken(string bodyToken);
    Task CreatePasswordResetToken(string email, string? queryParams);
    AuthResult UsePasswordResetToken(string token, string password);
}