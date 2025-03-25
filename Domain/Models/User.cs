using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public Role Role { get; set; }

        public int RoleId { get; set; }
        public UserDetails UserDetails { get; set; }
        public List<Product> products { get; set; }
        public bool IsActive { get; set; } 


    }
}
