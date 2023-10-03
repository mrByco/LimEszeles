using margarita_data.Roles;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace margarita_data.Models
{
    public class LicenseType
    {
        [Required]
        public string LicenseName { get; set; }
        [Required]
        public List<Permission> LicensePermissions { get; set; }
        [Required]
        public int GalleryLimit { get;set;}
    }

    public static class BASE_LICENSES
    {
        public static LicenseType TrialLicense => new LicenseType() 
        { 
            LicenseName = "LICENSES.TRIAL",
            LicensePermissions = new List<Permission>() {
                Permission.edit_menu,
                Permission.edit_restaurant,
                Permission.read_orders,
                Permission.write_orders,
                Permission.delete_restaurant,
                Permission.manage_employees,
                Permission.read_employees,
                Permission.dashboard,
                Permission.documents
            },
            GalleryLimit = 20
        };
    }
}
