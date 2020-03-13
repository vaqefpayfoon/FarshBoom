using FarshBoomCore.Extensions;
using FarshBoomCore.FluentApiMapping;
using Microsoft.EntityFrameworkCore;

namespace FarshBoomCore.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            AddConfigurations(builder);
        }
        void AddConfigurations(ModelBuilder builder)
        {
            builder.AddConfiguration(new SizeMap());

        }
    }
}