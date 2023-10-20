using System.ComponentModel.DataAnnotations;

namespace margarita_data.Models
{
    public class LicenseInfo: BaseRootModel
    {
        [Required]
        public string RestaurantId { get; set; }
        [Required]
        public LicenseType LicenseType { get; set; }
        public DateTime GrantedDate { get; set; }
        public DateTime ActivatedDate { get; set; }
        public DateTime ValidUntil { get; set; }
    }
}
