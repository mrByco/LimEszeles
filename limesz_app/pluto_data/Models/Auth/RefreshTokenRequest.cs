using System;
using System.ComponentModel.DataAnnotations;

namespace margarita_app.Models.Auth
{
	public class RefreshTokenRequest
	{
		[Required]
		public string Token { get; set; }
	}
}

