using limesz_app.Misc.GameLogic.Abstraction;
using margarita_data.Models;
using pluto.PlutoRepo;
using pluto.Services.Database;

namespace limesz_app.Services;

public class CardSetService: PlutoSmartRepo<CardSet>
{
    public CardSetService(IMongoDatabaseService mongoDatabaseService) : base(mongoDatabaseService, "CardSets1s")
    {
    }


    public static List<Card> GetUnoCardSet()
    {
        List<string> colors = new List<string>()
        {
            "blue",
            "green",
            "red",
            "yellow"
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
                var p = new Dictionary<string, object>()
                {
                    {"Color", color},
                    {"Value", value}
                };
                cards.Add(new Card()
                {
                    Image = ($"/assets/uno-cards/{color}-{value}.png").ToLower().Replace(" ", "-"),
                    Id = Guid.NewGuid().ToString(),
                    Params = p
                });
            }
        }

        return cards;
    }


    public static List<Card> PromptDebugCardSet()
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
            "Wild", "Wild Draw 4",
            "Wild", "Wild Draw 4",
            "Wild", "Wild Draw 4",
            "Wild", "Wild Draw 4",
            "Wild", "Wild Draw 4",
            "Wild", "Wild Draw 4",
            "Wild", "Wild Draw 4",
            "Wild", "Wild Draw 4",
            "Wild", "Wild Draw 4",
            "Wild", "Wild Draw 4",
            "Wild", "Wild Draw 4",
            "Wild", "Wild Draw 4"
        };

        List<Card> cards = new List<Card>();

        foreach (var color in colors)
        {
            foreach (var value in values)
            {
                var p = new Dictionary<string, object>()
                {
                    {"Color", color},
                    {"Value", value}
                };
                cards.Add(new Card()
                {
                    Image = ($"/assets/uno-cards/{color}-{value}.png").ToLower().Replace(" ", "-"),
                    Id = Guid.NewGuid().ToString(),
                    Params = p
                });
            }
        }

        return cards;
    }

}