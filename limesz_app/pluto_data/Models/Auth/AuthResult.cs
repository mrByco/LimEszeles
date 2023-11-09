using System;
using System.ComponentModel.DataAnnotations;

namespace margarita_app.Models.Auth
{
	public class AuthResult
	{
		[Required]
		public string AccessToken { get; set; }
        [Required]
        public DateTime AccessTokenValidty { get; set; }
        [Required]
        public string RefreshToken { get; set; }
        [Required]
        public DateTime RefreshTokenValidity { get; set; }
	}
}

