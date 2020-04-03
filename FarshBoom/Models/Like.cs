namespace FarshBoom.Models
{
    public class Like : BaseEntity
    {
        public int GoodId { get; set; }
        public Good Good { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}