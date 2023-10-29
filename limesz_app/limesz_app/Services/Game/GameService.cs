using cardsplusplus.Abstraction;
using margarita_app.Hubs;
using margarita_app.Models;
using Microsoft.AspNetCore.SignalR;
using margarita_app.Misc;
using margarita_app.Misc.GameLogic.CardGame;
using margarita_app.Services.CardGame;
using margarita_data.Models;

namespace margarita_app.Services;

public class GameService
{
    private readonly List<Ride> _rides = new List<Ride>();
    private readonly IHubContext<RideHub> _rideHub;
    private readonly ConnectionService _connectionService;

    private readonly Dictionary<Ride, Misc.GameLogic.CardGame.CardGame> _cardGames = new Dictionary<Ride, Misc.GameLogic.CardGame.CardGame>();

    public GameService(IHubContext<RideHub> rideHub, ConnectionService connectionService)
    {
        _rideHub = rideHub;
        _connectionService = connectionService;
    }
    
    public Ride CreateLobby(string userName, string userId)
    {
        var ride = new Ride();
        ride.Id = GenerateRideId();
        ride.State = "lobby";
        ride.Users = new List<User>();
        ride.Users.Add(new User()
        {
            Id = userId,
            Username = userName
        });
        _rides.Add(ride);
        
        NotifyRide(ride);
        
        return ride;
    }


    private static string GenerateRideId()
    {
        string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        Random random = new Random();
        string result = new string(
            Enumerable.Repeat(chars, 5)
                .Select(s => s[random.Next(s.Length)])
                .ToArray());
        return result;
    }

    public void JoinLobby(string userName, string userId, string lobbyId)
    {
        var ride = this._rides.Find(l => l.Id == lobbyId);
        if (ride == null)
        {
            throw new Exception("Ride not found");
        }
        ride.Users.Add(new User()
        {
            Id = userId,
            Username = userName
        });
        NotifyRide(ride);
    }
    
    public async Task LeaveLobby(string userId)
    {
        
        var ride = this._rides.Find(l => l.Users.Any(u => u.Id == userId));
        if (ride == null)
        {
            throw new Exception("Ride not found");
        }
        ride.Users.RemoveAll(u => u.Id == userId);
        NotifyRide(ride);
        var removedPlayerConnectionId = _connectionService.GetConnectionByUserId(userId);
        await _rideHub.Clients.Clients(removedPlayerConnectionId).SendAsync("rideChanged", null);
        if (ride.Users.Count == 0)
        {
            await _rideHub.Clients.Clients(removedPlayerConnectionId).SendAsync("rideChanged", null);
            _rides.Remove(ride);
        }
    }
    
    private void NotifyRide(Ride ride)
    {
        var connectionIds = _connectionService.GetConnectionIdsForRide(ride);
        if (connectionIds.Count == 0)
        {
            return;
        }
        _rideHub.Clients.Clients(connectionIds).SendAsync("rideChanged", ride);
    }
    
    private void NotifyRemoved(Ride ride)
    {
        var connectionIds = _connectionService.GetConnectionIdsForRide(ride);
        _rideHub.Clients.Clients(connectionIds).SendAsync("rideChanged", null);
    }

    public async Task StartGame(string userId)
    {
        Ride? rideToStart = GetRideByUserId(userId);
        if (rideToStart == null)
        {
            throw new Exception("Ride not found");
        }
        
        rideToStart.State = "game";
        var cardGame = new Misc.GameLogic.CardGame.CardGame(rideToStart, new LimeszUno());
        cardGame.OnChange += () => NotifyRide(rideToStart);
        _cardGames.Add(rideToStart, cardGame);
        _cardGames[rideToStart].Start();
        NotifyRide(rideToStart);

    }

    private Ride? GetRideByUserId(string userId)
    {
        return _rides.FirstOrDefault(r => r.Users.Any(u => u.Id == userId));
    }

    public Ride? ReconnectPlayer(string userId)
    {
        return _rides.FirstOrDefault(r => r.Users.Any(u => u.Id == userId));
    }

    public void PlayCard(string cardId, string userId)
    {
        var ride = GetRideByUserId(userId);
        if (ride == null)
        {
            throw new Exception("Ride not found");
        }
        _cardGames[ride].PlayCardById(cardId, userId);
    }

    public void PullFromDeck(string userId, string deckName, int count)
    {
        var ride = GetRideByUserId(userId);
        if (ride == null)
        {
            throw new Exception("Ride not found");
        }
        _cardGames[ride].PullFromDeck(userId, deckName, count);
    }
}