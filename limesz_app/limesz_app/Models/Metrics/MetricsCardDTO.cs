﻿using System;
using System.ComponentModel.DataAnnotations;

namespace margarita_app.Models.Metrics
{
	public class MetricsCardDTO
	{
		public object? Title { get; set; }
        [Required]
        public object MainData { get; set; }
        public object? Subtitle { get; set; }
        public object? SideData { get; set; }
    }
}

