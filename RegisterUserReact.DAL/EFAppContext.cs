using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RegisterUserReact.DAL.Identity;
using RegisterUserReact.DAL.Identity.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace RegisterUserReact.DAL
{
    public class EFAppContext : IdentityDbContext<AppUser, AppRole, long, IdentityUserClaim<long>,
        AppUserRole, IdentityUserLogin<long>, IdentityRoleClaim<long>, IdentityUserToken<long>>
    {
        public EFAppContext(DbContextOptions opt) : base(opt)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            #region Identity
                builder.ApplyConfiguration(new IdentityConfiguration());
            #endregion
        }
    }
}
