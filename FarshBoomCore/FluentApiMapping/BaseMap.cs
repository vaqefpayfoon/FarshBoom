using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using FarshBoomCore.Models;

namespace FarshBoomCore.FluentApiMapping
{
   
    public class SizeMap : Extensions.DbEntityConfiguration<Size>
    {
        public override void Configure(EntityTypeBuilder<Size> t)
        {
            t.ToTable("Sizes");
            t.HasKey(x => x.Id);
            t.Property(x => x.Title).IsRequired();
        }
    }

}
