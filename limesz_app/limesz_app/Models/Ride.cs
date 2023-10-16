namespace margarita_app.Models;


public class Ride
{
    public string Id { get; set; }
    public string State { get; set; }
    public Dictionary<string, Player> Players { get; set; }
}

public class Player
{
    public string Id { get; set; }
    public string Name { get; set; }
}
