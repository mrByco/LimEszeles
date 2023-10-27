using margarita_app.Models;

namespace margarita_app.Services.CardGame;

public class Deck
{
    public string Name { get; set; }
    public List<Card> Cards { get; set; } = new List<Card>();
}