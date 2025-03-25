using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Efforeignkeytask.Datacontext
{
    public class UserDbContext:DbContext
    {
        public UserDbContext(DbContextOptions<UserDbContext>option):base(option)
        {
            
        }
        public DbSet<Role> role { get; set; }
        public DbSet<User> users { get; set; }
        public DbSet<UserDetails> userdetails { get; set; }
        public DbSet<Product> products { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>().HasData(new Role { Id = 1, Name = "Admin" },
                                                  new Role { Id = 2, Name = "Customer" },
                                                  new Role { Id = 3, Name = "Seller" }
   );
        }

    }
}
