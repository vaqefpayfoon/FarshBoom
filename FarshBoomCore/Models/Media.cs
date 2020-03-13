
using System.ComponentModel.DataAnnotations.Schema;

namespace FarshBoomCore.Models
{
    [NotMapped]
    public class Media : BaseEntity
    {
        public string FileName { get; set; }
        public string Description { get; set; }
        public string MediaType { get; set; }
        public int RowId { get; set; }
    }
}


