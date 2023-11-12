using System.ComponentModel.DataAnnotations;

namespace Pluto.Models.Auth
{
	public class RefreshTokenRequest
	{
		[Required]
		public string Token { get; set; }
	}
}

