using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization.Attributes;

namespace margarita_data.Models
{
    [BsonIgnoreExtraElements]
    public class User : BaseRootModel
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public byte[] PasswordSalt { get; set; }
        public DateTime LastLogin { get; set; }
        public DateTime RegistrationDate { get; set; }
        public List<TokenKey> RefreshTokenKeys { get; set; } = new List<TokenKey>();
        public PasswordResetToken? PasswordResetToken { get; set; }
        public bool EmailVerifyed { get; set; }
        public List<string> AppRoles { get; set; } = new List<string>();
        public List<CompanyRoles> CompanyRoles { get; set; } = new List<CompanyRoles>();
    }
}
