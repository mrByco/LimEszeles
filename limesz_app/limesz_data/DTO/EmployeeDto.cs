using System.ComponentModel.DataAnnotations;

namespace margarita_data.DTO
{
	public class EmployeeDto
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public List<string> Roles { get; set; }
        [Required]
        public bool Pending { get; set; } = false;

        
	}
}

