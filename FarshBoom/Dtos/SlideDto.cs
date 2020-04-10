using Microsoft.AspNetCore.Http;

namespace FarshBoom.Dtos
{
    public class SlideDto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public IFormFile File { get; set; }
    }
}