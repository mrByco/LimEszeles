using margarita_app.Misc.GameLogic.Abstraction;
using margarita_app.Misc.GameLogic.CardGame;
using margarita_app.Models;
using margarita_app.Services.CardGame;
using margarita_data.Models;

namespace cardsplusplus.Abstraction;


public class Ride
{
    public string Id { get; set; }
    public string State { get; set; }
    public List<User> Users { get; set; }

    public Game? Game { get; set; }
    public ScoreScreenData? ScoreScreenData { get; set; }
    private List<string> currentPlayers = new ();
}


public class Game
{
    public List<Deck> decks { get; set; } = new List<Deck>();
    public List<Player> Players { get; set; }
    public List<Player> InteractivePlayers { get; set; } = new List<Player>();
    public List<CustomPromptDefinition> CustomPrompts { get; set; } = new List<CustomPromptDefinition>();
    public List<ActivePrompt> ActivePrompts { get; set; } = new List<ActivePrompt>();
}

public class ScoreScreenData
{
}

public class Player
{
    public string UserId { get; set; }
    internal string Id => UserId;
    public string Name { get; set; }

    public List<Card> Cards { get; set; }
}
