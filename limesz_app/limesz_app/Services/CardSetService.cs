using limesz_app.Misc.GameLogic.Abstraction;
using margarita_data.Models;
using pluto.PlutoRepo;
using pluto.Services.Database;

namespace limesz_app.Services;

public class CardSetService : PlutoSmartRepo<CardSet>
{
    public CardSetService(IMongoDatabaseService mongoDatabaseService) : base(mongoDatabaseService, "CardSets1s")
    {
    }

    public static List<CardSet> GetCardSets()
    {
        return new List<CardSet>()
        {
            GetUnoCardSet(),
            PromptDebugCardSet(),
            GetLimeszCard()
        };
    }

    public static CardSet GetDefaultCardSet()
    {
        return GetUnoCardSet();
    }


    public static CardSet GetUnoCardSet()
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
        
        foreach (var card in cards)
        {
            card.BackImage = "/assets/uno-cards/uno-back.png";
        }

        return new CardSet()
        {
            Id = "656cb3031d3cdbabd202c6d7",
            Name = "Classic Uno Card Set",
            Description = "Classic Card Set",
            Cards = cards,
            Image = "/assets/limesz-cards/any-any.png"
        };
    }


    public static CardSet PromptDebugCardSet()
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
        
        foreach (var card in cards)
        {
            card.BackImage = "/assets/uno-cards/uno-back.png";
        }

        CardSet cardSet = new CardSet()
        {
            Id = "656cb3031d3cdbabd202c6d7",
            Name = "Debug Card Set",
            Description = "Debug Card Set for prompt testing",
            Cards = cards
        };

        return cardSet;
    }

    public static CardSet GetLimeszCard()
    {
        List<Card> cards = new List<Card>();

        List<string> values = new List<string>()
        {
            "1", "-inf", "-2", "-1", "0", "0", "1/e", "2", "e", "inf",
            
            "-1", "e", "-inf", "-2", "0", "0", "1/e", "1", "2", "inf",
            
            "-2", "-inf", "-1", "1", "0", "1/e", "1", "2", "e", "inf",
            
            "inf", "-inf", "-2", "-1", "0", "0", "1/e", "1", "2", "e",
        };
        
        List<string> colors = new List<string>()
        {
            "Red",
            "Blue",
            "Green",
            "Yellow"
        };

        for (int i = 0; i < 4; i++)
        {
            var color = colors[i];
            
            for (int j = 0; j < 20; j++)
            {
                colors.Add(color);
                int id = i * 20 + j + 1;
                string numberPad = id.ToString().PadLeft(2, '0');
                string imageName = $"/assets/limesz-cards/teljes_pakli_szerk._nyomda-{numberPad}.png";
                
                int valueIndex = (int) Math.Floor((id + 1) / 2.0) - 1;
                
                cards.Add(new Card()
                {
                    Id = Guid.NewGuid().ToString(),
                    Image = imageName,
                    Params = new Dictionary<string, object>()
                    {
                        {"Color", color},
                        {"Value", values[valueIndex]}
                    }
                });
                
            }
        }
        
        
        cards.AddRange(Enumerable.Repeat(new Card()
        {
            Id = Guid.NewGuid().ToString(),
            Image = "/assets/limesz-cards/any.png",
            Params = new Dictionary<string, object>()
            {
                {"Color", "any"},
                {"Value", "any"}
            }
        }, 3));

        cards.AddRange(Enumerable.Repeat(new Card()
        {
            Id = Guid.NewGuid().ToString(),
            Image = "/assets/limesz-cards/get_2.png",
            Params = new Dictionary<string, object>()
            {
                {"Color", "any"},
                {"Value", "get-2"}
            }
        }, 3));

        cards.AddRange(Enumerable.Repeat(new Card()
        {
            Id = Guid.NewGuid().ToString(),
            Image = "/assets/limesz-cards/get_3.png",
            Params = new Dictionary<string, object>()
            {
                {"Color", "any"},
                {"Value", "get-3"}
            }
        }, 3));

        cards.AddRange(Enumerable.Repeat(new Card()
        {
            Id = Guid.NewGuid().ToString(),
            Image = "/assets/limesz-cards/pull_one.png",
            Params = new Dictionary<string, object>()
            {
                {"Color", "any"},
                {"Value", "pull-one"}
            }
        }, 3));

        cards.AddRange(Enumerable.Repeat(new Card()
        {
            Id = Guid.NewGuid().ToString(),
            Image = "/assets/limesz-cards/skip.png",
            Params = new Dictionary<string, object>()
            {
                {"Color", "any"},
                {"Value", "Skip"}
            }
        }, 3));

        cards.AddRange(Enumerable.Repeat(new Card()
        {
            Id = Guid.NewGuid().ToString(),
            Image = "/assets/limesz-cards/switch_cards.png",
            Params = new Dictionary<string, object>()
            {
                {"Color", "any"},
                {"Value", "switch"}
            }
        }, 3));

        foreach (var card in cards)
        {
            card.BackImage = "/assets/limesz-cards/teljes_pakli_szerk._nyomda-81.png";
        }


        return new CardSet()
        {
            Id = "656cb3031d3cdbabd202c6d8",
            Name = "Limesz Card",
            Description = "Limesz Card",
            Image = "/assets/limesz-cards/teljes_pakli_szerk._nyomda-81.png",
            Cards = cards
        };
    }
}