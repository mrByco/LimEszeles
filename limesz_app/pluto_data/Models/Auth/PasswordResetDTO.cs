namespace margarita_app.Models.Auth
{
    public class PasswordResetDTO
    {
        public string Token { get; set; }
        public string Password { get; set; }
    }
}
