using limesz_app.Misc.GameLogic.CardGame;
using Pluto.Models;

namespace limesz_app.Misc.GameLogic.Abstraction;


public class Ride
{
    public string Id { get; set; }
    public string State { get; set; }
    public List<User> Users { get; set; }

    public Game? Game { get; set; }
    public ScoreScreenData? ScoreScreenData { get; set; }
    private List<string> currentPlayers = new ();
    public GameSettings Settings { get; set; } = new GameSettings();
}


public class Game
{
    public List<Deck> decks { get; set; } = new List<Deck>();
    public List<Player> Players { get; set; }
    public List<Player> InteractivePlayers { get; set; } = new List<Player>();
    public List<CustomPromptDefinition> CustomPrompts { get; set; } = new List<CustomPromptDefinition>();
    public List<ActivePrompt> ActivePrompts { get; set; } = new List<ActivePrompt>();
    public List<InGameNotification> InGameNotifications { get; set; } = new List<InGameNotification>();
    public GameSettings Settings { get; set; } = new GameSettings();
}

public class GameSettings
{
    public string CardSetId { get; set; }
}

public class InGameNotification
{
    public string Title { get; set; }
    public string? Description { get; set; }
    public DateTime Created { get; set; } = DateTime.Now;
    public string Id { get; set; } = Guid.NewGuid().ToString();
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
