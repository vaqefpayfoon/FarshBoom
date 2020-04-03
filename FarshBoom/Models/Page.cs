namespace FarshBoom.Models
{
    public class Page : BaseEntity
    {
           
    }
    public class PageContent
    {
        public int Id { get; set; }
        public int PageId { get; set; }
        public Page Page { get; set; }
        public string Passage { get; set; }
        public string ImageUrl { get; set; }
    }
}