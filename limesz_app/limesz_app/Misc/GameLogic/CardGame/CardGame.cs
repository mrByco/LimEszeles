using System.Dynamic;
using cardsplusplus.Abstraction;
using margarita_app.Models;

namespace margarita_app.Services.CardGame;

public sealed class CardGame
{
    private List<Player> players => this.hostRide.Game.Players;
    private List<Deck> decks => this.hostRide.Game.decks;

    public List<Player> currentPlayers
    {
        get => hostRide.Game.Players;
        set => hostRide.Game.Players = value;
    }
    // Players who able to take action
    private Ride hostRide;

    private IGameBehaviour _behaviour;

    public CardGame(Ride initGameState, IGameBehaviour behaviour)
    {
        hostRide = initGameState;
        hostRide.Game = new Game();
        hostRide.Game.Players = new List<Player>();
        
        _behaviour = behaviour;
        _behaviour.Init(this);
    }
    
    public void Start()
    {
        _behaviour.Start();
    }

    public void CreateDeck(string name, List<Card> cards)
    {
        decks.Add(new Deck
        {
            Name = name,
            Cards = cards
        });
    }
    
    protected void RemoveDeck(string name)
    {
        decks.Remove(GetDeck(name));
    }

    public void ShuffleDeck(string deckName)
    {
        var deck = GetDeck(deckName);
        var random = new Random();
        var n = deck.Cards.Count;
        while (n > 1)
        {
            n--;
            var k = random.Next(n + 1);
            (deck.Cards[k], deck.Cards[n]) = (deck.Cards[n], deck.Cards[k]);
        }
    }
    
    public void DealCards(string fromDeck, int number)
    {
        ShuffleDeck(fromDeck);
        foreach (var player in players)
        {
            GiveCards(player, number, fromDeck);
        }
    }

    public void GiveCards(Player player, int number, string deckName)
    {
        var deck = GetDeck(deckName);
        var cards = new List<Card>();
        for (var i = 0; i < number; i++)
        {
            cards.Add(deck.Cards[0]);
            deck.Cards.RemoveAt(0);
        }
        GetPlayer(player.Id)?.Cards.AddRange(cards);
    }

    public Deck GetDeck(string name)
    {
        return decks.FirstOrDefault(deck => deck.Name == name)!;
    }
    private Player?GetPlayer(string id)
    {
        return players.FirstOrDefault(p => p.Id == id);
    }

    public object? Get(string nameOrId)
    {
        object? obj;
        obj = GetDeck(nameOrId);
        if (obj != null) return obj;
        obj = GetPlayer(nameOrId);
        if (obj != null) return obj;
        return null;
    }

    public void SetCurrentPlayer(string player)
    {
        currentPlayers = new List<Player> { GetPlayer(player)! };
    }

    public void SetCurrentPlayers(List<string> players)
    {
        currentPlayers = players.Select(p => GetPlayer(p)).ToList();
    }
    
    public void PlayerAction(Card card)
    {
        
    }

    public Player RandomPlayer => players[new Random().Next(players.Count)];
    public Player CurrentPlayer => players.Find(player => player.Id == currentPlayers[0].Id)!;
    public string DefaultNextPlayer => throw new NotImplementedException();


    public Card GetLastCardFromDeck(string deck)
    {
        return GetDeck(deck).Cards.Last();
    }

    public void MoveCard(string sourceStr, string destinationStr, string cardId)
    {
        Card card;
        object source = Get(sourceStr);
        if (source == null)
        {
            return;
        }

        if (source is Player sourcePlayer)
        {
            
        }
        if (source is Deck sourceDeck)
        {
            
        }
        
    }
}