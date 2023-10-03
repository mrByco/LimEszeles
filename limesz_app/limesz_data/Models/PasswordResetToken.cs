using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace margarita_data.Models
{
    public class PasswordResetToken
    {
        public string Token { get; set; }
        public DateTime ExpirationDate { get; set; }
    }
}
