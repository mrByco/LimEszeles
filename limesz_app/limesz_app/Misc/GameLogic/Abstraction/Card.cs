namespace margarita_app.Models;

public class Card
{
    public string Id { get; set; }
    
    public string Image { get; set; }
    public Dictionary<string, object> Params { get; set; }

}