namespace margarita_app.Models;

public class Card
{
    public string Id { get; set; }
    public string Color { get; set; }
    // There are special values like: 
    public string Value { get; set; }
    public string? DisplayedValue { get; set; }
    
}