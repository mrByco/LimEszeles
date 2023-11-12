using System.ComponentModel.DataAnnotations;

namespace limesz_app.Models
{
	public class ChatDto
	{
		[Required]
		public string Role { get; set; }
        [Required]
        public string Message { get; set; }
        [Required]
        public DateTime Time { get; set; } = DateTime.UtcNow;
    }
}

