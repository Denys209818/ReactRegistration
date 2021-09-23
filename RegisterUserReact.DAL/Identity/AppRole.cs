using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace RegisterUserReact.DAL.Identity
{
    public class AppRole : IdentityRole<long>
    {
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}
