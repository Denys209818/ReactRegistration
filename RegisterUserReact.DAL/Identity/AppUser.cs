using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace RegisterUserReact.DAL.Identity
{
    public class AppUser : IdentityUser<long>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}
