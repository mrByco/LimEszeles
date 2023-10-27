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
    public List<Deck> decks = new List<Deck>();
    public List<Player> Players { get; set; }
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
