using margarita_app.Models;

namespace margarita_app.Services;

public class CardSetService
{
    public static List<Card> GetUnoCardSet()
    {
        List<string> colors = new List<string>()
        {
            "Blue",
            "Green",
            "Red",
            "Yellow"
        };

        List<string> values = new List<string>()
        {
            "0", "1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6", "7", "7", "8", "8", "9", "9", "Skip",
            "Skip", "Reverse", "Reverse", "Draw 2", "Draw 2", "Wild", "Wild Draw 4"
        };

        List<Card> cards = new List<Card>();

        foreach (var color in colors)
        {
            foreach (var value in values)
            {
                cards.Add(new Card()
                {
                    Color = color,
                    Value = value
                });
            }
        }

        return cards;
    }
}