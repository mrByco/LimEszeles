using limesz_app.Misc.GameLogic.Abstraction;

namespace limesz_app.Misc.GameLogic.CardGame;

public class Deck
{
    public string Name { get; set; }
    public List<Card> Cards { get; set; } = new List<Card>();
    public DeckConfig DeckConfig { get; set; } = new DeckConfig();
}