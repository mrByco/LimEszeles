using cardsplusplus.Abstraction;
using margarita_app.Models;
using margarita_app.Services;
using margarita_app.Services.CardGame;

namespace margarita_app.Misc.GameLogic.CardGame;

public class LimeszUno : IGameBehaviour
{
    private CardGame Game { get; set; }

    public void Init(CardGame game)
    {
        Game = game;
        Game.CreateDeck("Source", CardSetService.GetUnoCardSet());
        Game.CreateDeck("Discard", new List<Card>());
        Game.GetDeck("Discard").DeckConfig.UpsideDown = false;
        Game.GetDeck("Discard").DeckConfig.CanPull = false;
    }

    public void Start()
    {
        Game.ShuffleDeck("Source");
        Game.DealCards("Source", 5);
        Game.MoveCard("Source", "Discard", Game.GetLastCardFromDeck("Source").Id);
        Game.SetCurrentPlayer(Game.RandomPlayer.Id);
    }

    public void PlayCard(Card card, Player player)
    {
        if (!player.Cards.Contains(card))
        {
            throw new Exception("Player doesn't have this card");
        }

        var lastCard = Game.GetLastCardFromDeck("Discard");
        if (IsCardPlayable(card, lastCard))
        {
            Game.MoveCard(Game.CurrentPlayer.Id, "Discard", card.Id);
            if (player.Cards.Count == 1)
            {
                // Player calls "Uno" if they have only one card left.
                // You may want to add specific handling for this.
            }

            if (player.Cards.Count == 0)
            {
                // Player wins the game.
                // You may want to add specific handling for this.
            }

        }
        else
        {
            // Player draws two cards as a penalty for playing an invalid card.
            Game.GiveCards(Game.CurrentPlayer.Id, 2, "Source");
        }
        Game.SetCurrentPlayer(Game.DefaultNextPlayer);
        Game.NotifyClients();
    }

    public void PullFromDeck(Player getPlayer, Deck getDeck, int count)
    {
        Game.GiveCards(getPlayer.Id, count, getDeck.Name);
        Game.SetCurrentPlayer(Game.DefaultNextPlayer);
        Game.NotifyClients();
    }

    private bool IsCardPlayable(Card card, Card lastCard)
    {
        // Check if the card can be played based on Uno rules.
        if (card.Color == lastCard.Color || card.Value == lastCard.Value)
        {
            return true;
        }

        // Wild cards are always playable.
        if (card.Value == "Wild" || card.Value == "Wild Draw Four")
        {
            return true;
        }

        return false;
    }
}