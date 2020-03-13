using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FarshBoomCore.Models
{
    public class BaseEntity
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime? LastModifiedDate { get; set; }
        public DateTime? AddedDate { get; set; }
        public string SystemUserId { get; set; }
    }
    public class Size : BaseEntity { }

}
