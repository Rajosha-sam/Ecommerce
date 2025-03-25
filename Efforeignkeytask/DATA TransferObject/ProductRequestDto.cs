namespace Efforeignkeytask.DATA_TransferObject
{
    public class ProductRequestDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public int Stock { get; set; }
        public string Category { get; set; }
       
        public IFormFile ImageUrl { get; set; }
        public int UserId { get; set; }
    }
}
