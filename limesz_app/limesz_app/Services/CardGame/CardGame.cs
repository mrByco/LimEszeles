using margarita_app.Models;

namespace margarita_app.Services.CardGame;

public class CardGame
{
    private List<Player> players;
    private List<Deck> decks;
    private Dictionary<string, List<Card>> cardsByPlayerId;
    // Players who able to take action
    private List<string> currentPlayers = new List<string>();

    

    public virtual void Init(List<Player> players)
    {
        this.players = players;
    }
    
    public virtual void Start()
    {
        
    }
    
    protected void CreateDeck(string name, List<Card> cards)
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

    protected void ShuffleDeck(string deckName)
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
    
    protected void DealCards(string fromDeck, int number)
    {
        ShuffleDeck(fromDeck);
        foreach (var player in players)
        {
            GiveCards(player, number, fromDeck);
        }
    }

    protected void GiveCards(Player player, int number, string deckName)
    {
        var deck = GetDeck(deckName);
        var cards = new List<Card>();
        for (var i = 0; i < number; i++)
        {
            cards.Add(deck.Cards[0]);
            deck.Cards.RemoveAt(0);
        }
        cardsByPlayerId[player.Id].AddRange(cards);
    }

    protected Deck GetDeck(string name)
    {
        return decks.Find(deck => deck.Name == name)!;
    }

    protected void SetCurrentPlayer(Player player)
    {
        this.currentPlayers = new List<string> {player.Id};
    }
    
    protected void SetCurrentPlayers(List<Player> players)
    {
        this.currentPlayers = players.Select(player => player.Id).ToList();
    }
    
    protected void PlayerAction(Card card)
    {
        
    }

    protected Player RandomPlayer => players[new Random().Next(players.Count)];
}