namespace margarita_app.Models;


public abstract class Ride
{
    public string Id { get; set; }
    public abstract string State { get; }
    public Dictionary<string, Player> Players { get; set; }
}

public class Lobby : Ride
{
    public override string State => "lobby";
}

public class Game : Ride
{
    public override string State => "game";
    public List<Card> Deck { get; set; }
}

public class ScoreScreen : Ride
{
    public override string State => "score";
}

public class Player
{
    public string Id { get; set; }
    public string Name { get; set; }
}
