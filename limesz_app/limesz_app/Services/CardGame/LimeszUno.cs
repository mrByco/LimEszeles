using margarita_app.Models;

namespace margarita_app.Services.CardGame;

public class LimeszUno: CardGame
{
    public override void Init(List<Player> players)
    {
        CreateDeck("Source", CardSetService.GetUnoCardSet());
        CreateDeck("Discard", new List<Card>());
        base.Init(players);
    }

    public override void Start()
    {
        SetCurrentPlayer(RandomPlayer);
        base.Start();
    }
    
    
}