using System.Resources;
using margarita_app.Models;

namespace margarita_app.Services.CardGame;

public class LimeszUno: IGameBehaviour
{
    private CardGame Game { get; set; }
    public void Init(CardGame game)
    {
        Game = game;
        Game.CreateDeck("Source", CardSetService.GetUnoCardSet());
        Game.CreateDeck("Discard", new List<Card>());
    }

    public void Start()
    {
        Game.ShuffleDeck("Source");
        Game.DealCards("Source", 5);
        Game.SetCurrentPlayer(Game.RandomPlayer.Id);
    }
    
    public void PlayCard(Card card)
    {
        var lastCard = Game.GetLastCardFromDeck("Discard");
        if (lastCard.Color == card.Color || lastCard.Value == card.Value)
        {
            Game.MoveCard(Game.CurrentPlayer.Id, "Discard", card.Id);
            Game.SetCurrentPlayer(Game.DefaultNextPlayer);
        }
    }
}