using System;
using System.ComponentModel.DataAnnotations;
using MongoDB.Bson.Serialization.Attributes;

namespace margarita_data.Models
{
    [BsonIgnoreExtraElements]
    public class FoodSize
	{
		public string Guid { get; set; } = System.Guid.NewGuid().ToString();
        [Required]
        public LanguageString Name { get; set; }
        [Required]
        public int Price { get; set; }
        [Required]
        public int CouponPoints { get; set; } = 0;
	}
}

