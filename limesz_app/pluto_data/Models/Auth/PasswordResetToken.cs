namespace Pluto.Models.Auth
{
    public class PasswordResetToken
    {
        public string Token { get; set; }
        public DateTime ExpirationDate { get; set; }
    }
}
