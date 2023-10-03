using System;
using System.ComponentModel.DataAnnotations;

namespace margarita_data.Models
{
	public class LanguageStringItem
	{
        [Required]
        public string Code { get; set; }
        [Required]
        public string Value { get; set; }
	}
}

