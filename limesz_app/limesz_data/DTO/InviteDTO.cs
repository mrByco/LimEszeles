using System;
using System.ComponentModel.DataAnnotations;

namespace margarita_data.DTO
{
	public class InviteDTO
    {
        [Required]
        public string InviterName { get; set; }
        [Required]
        public string InviteType { get; set; }
        [Required]
        public List<string> Roles { get; set; }
    }
}

