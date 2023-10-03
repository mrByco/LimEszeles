namespace margarita_app.Models
{
    public class OrderDto
    {
        public string Id { get; set; }
        public string Type { get; set; }
        public DateTime? Completed { get; set; }
        public float Price { get; set; }
    }
}
