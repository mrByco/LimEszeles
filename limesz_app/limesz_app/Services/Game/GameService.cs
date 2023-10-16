using margarita_app.Hubs;
using margarita_app.Models;
using Microsoft.AspNetCore.SignalR;

namespace margarita_app.Services;

public class GameService
{
    private readonly List<Ride> _rides = new List<Ride>();
    private readonly IHubContext<RideHub> _rideHub;
    private readonly ConnectionService _connectionService;

    public GameService(IHubContext<RideHub> rideHub, ConnectionService connectionService)
    {
        _rideHub = rideHub;
        _connectionService = connectionService;
    }
    
    public Ride CrateRide(string userName, string userId)
    {
        var ride = new Ride();
        ride.Id = GenerateRideId();
        ride.Players = new Dictionary<string, Player>();
        ride.Players.Add(userId, new Player()
        {
            Id = userId,
            Name = userName
        });
        ride.State = "lobby";
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
        ride.Players.Add(userId, new Player()
        {
            Id = userId,
            Name = userName
        });
        NotifyRide(ride);
    }
    
    public void LeaveLobby(string userId)
    {
        
        var ride = this._rides.Find(l => l.Players.ContainsKey(userId));
        if (ride == null)
        {
            throw new Exception("Ride not found");
        }
        ride.Players.Remove(userId);
        NotifyRide(ride);
        var removedPlayerConnectionId = _connectionService.GetConnectionByUserId(userId);
        _rideHub.Clients.Clients(removedPlayerConnectionId).SendAsync("rideChanged", null);
        if (ride.Players.Count == 0)
        {
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
}