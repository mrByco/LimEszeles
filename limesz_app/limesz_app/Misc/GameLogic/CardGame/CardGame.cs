using limesz_app.Misc.GameLogic.Abstraction;

namespace limesz_app.Misc.GameLogic.CardGame;

public sealed class CardGame
{
    private List<Player> players => hostRide.Game.Players;
    private List<Deck> decks => this.hostRide.Game.decks;
    
    public delegate void OnChangeHandler();

    public event OnChangeHandler OnChange;

    public List<Player> currentPlayers
    {
        get => hostRide.Game.InteractivePlayers;
        set => hostRide.Game.InteractivePlayers = value;
    }
    // Players who able to take action
    private Ride hostRide;
    private Dictionary<string, TaskCompletionSource<Dictionary<string, object>>> activeTasks = new Dictionary<string, TaskCompletionSource<Dictionary<string, object>>>();
    
    private IGameBehaviour _behaviour;

    public CardGame(Ride initGameState, IGameBehaviour behaviour)
    {
        hostRide = initGameState;
        hostRide.Game = new Game();
        hostRide.Game.Players = initGameState.Users.Select((u) => new Player
        {
            UserId = u.Id,
            Name = u.Username,
            Cards = new List<Card>()
        }).ToList();
        
        hostRide.Stats = new GameStats();
        hostRide.Stats.UserStats = initGameState.Users.Select((u) => new UserStat
        {
            UserId = u.Id,
            PlayedCards = 0,
            Won = null
        }).ToList();
        
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
            GiveCards(player.Id, number, fromDeck);
        }
    }

    public void GiveCards(string playerId, int number, string deckName)
    {
        var deck = GetDeck(deckName);
        var cards = new List<Card>();
        for (var i = 0; i < number; i++)
        {
            cards.Add(deck.Cards[0]);
            deck.Cards.RemoveAt(0);
        }
        GetPlayer(playerId)?.Cards.AddRange(cards);
    }

    public Deck? GetDeck(string name)
    {
        return decks.FirstOrDefault(deck => deck.Name == name)!;
    }

    public Player? GetPlayer(string id)
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
    public Player RandomPlayer => players[new Random().Next(players.Count)];
    public Player CurrentPlayer => players.Find(player => player.Id == currentPlayers[0].Id)!;
    public int RoundDirection { get; set; } = 1;

    public string DefaultNextPlayer
    {
        get
        {
            int currentPlayerIndex = players.IndexOf(CurrentPlayer);

            if (currentPlayerIndex >= 0)
            {
                int nextPlayerIndex = (currentPlayerIndex + RoundDirection + players.Count) % players.Count;
                return players[nextPlayerIndex].Id;
            }
            return "PlayerNotFound";
        }
    }


    public Card GetLastCardFromDeck(string deck)
    {
        if (GetDeck(deck).Cards.Count == 0)
        {
            throw new Exception($"Deck: {deck} is empty");
        }
        return GetDeck(deck).Cards.Last();
    }

    public void NotifyClients()
    {
        if (OnChange != null)
        {
            OnChange();
        }
    }

    public void MoveCard(string sourceStr, string destinationStr, string cardId)
    {
        Card? card = null;
        object source = Get(sourceStr);
        if (source == null)
        {
            return;
        }
        
        if (source is Player sourcePlayer)
        {
            card = sourcePlayer.Cards.Find(c => c.Id == cardId)!;
            sourcePlayer.Cards.Remove(card);
        }
        
        if (source is Deck sourceDeck)
        {
            card = sourceDeck.Cards.Find(c => c.Id == cardId)!;
            sourceDeck.Cards.Remove(card);
        }
        
        if (card == null)
        {
            return;
        }
        
        object destination = Get(destinationStr);
        if (destination == null)
        {
            return;
        }
        
        if (destination is Player destinationPlayer)
        {
            destinationPlayer.Cards.Add(card);
        }

        if (destination is Deck destinationDeck)
        {
            destinationDeck.Cards.Add(card);
        }
    }

    public void PlayCardById(string cardId, string playerId)
    {
        var player = GetPlayer(playerId);
        var card = player.Cards.FirstOrDefault(c => c.Id == cardId);
        if (card == null)
        {
            return;
        }
        hostRide.Stats.UserStats.Find(s => s.UserId == playerId)!.PlayedCards++;
        _behaviour.PlayCard(card, player);
    }

    
    public void PullFromDeck(string userId, string deckName, int count)
    {
        _behaviour.PullFromDeck(GetPlayer(userId), GetDeck(deckName), count);
    }

    public void ReverseOrder()
    {
        this.RoundDirection *= -1;
    }

    public void DefinePrompt(string id, string uiType, object config)
    {
        hostRide.Game.CustomPrompts.Add(new CustomPromptDefinition()
        {
            Id = id,
            UiType = uiType,
            Configuration = config
        });
    }

    public async Task<Dictionary<string, object>> WaitForPrompt(string playerId, string promptId)
    {
        var showToken = Guid.NewGuid().ToString();

        var tcs = new TaskCompletionSource<Dictionary<string, object>>();
    
        // Store the TaskCompletionSource in a global dictionary
        activeTasks[showToken] = tcs;

        hostRide.Game.ActivePrompts.Add(new ActivePrompt()
        {
            shownTo = playerId,
            promptDefinitionId = promptId,
            showToken = showToken
        });

        OnChange();

        return await tcs.Task;
    }

    public void OnPromptResponded(string showToken, Dictionary<string, object> response)
    {
        var prompt = hostRide.Game.ActivePrompts.FirstOrDefault(p => p.showToken == showToken);
        if (prompt == null)
        {
            return;
        }

        // Check if there is a matching TaskCompletionSource in the global dictionary
        if (activeTasks.TryGetValue(showToken, out var tcs))
        {
            // Set the result and remove it from the dictionary
            tcs.SetResult(response);
            activeTasks.Remove(showToken);
        }
        hostRide.Game.ActivePrompts.Remove(prompt);
    }

    public void SendNotification(string title)
    {
        hostRide.Game.InGameNotifications.Add(new InGameNotification()
        {
            Title = title
        });
    }

    /// <summary>
    /// Defines a button for the player to press
    /// </summary>
    /// <param name="buttonType">You can refer to the button with it later</param>
    /// <param name="texture">The texture of the button</param>
    /// <param name="action">The callback action, when the button is pressed, gets the pusher player id as string</param>
    public void DefineButton(string buttonType, string texture, Action<string> action)
    {
        // TODO
    }

    /// <summary>
    /// Removes the player from the game
    /// </summary>
    /// <param name="playerId"></param>
    public void RemovePlayer(string playerId)
    
    
    {
        var player = GetPlayer(playerId);
        if (player == null)
        {
            return;
        }
        players.Remove(player);
    }

    public void SetCurrentColor(string? param)
    {
        this.hostRide.Game.CurrentColor = param;
    }

    public void StatPlayerWon(Player player)
    {
        var currentPosition = hostRide.Stats.UserStats.Max(s => s.Won);
        hostRide.Stats.UserStats.Find(s => s.UserId == player.Id)!.Won = currentPosition + 1;
    }
}