



using margarita_app.Models;
using margarita_app.Services;
using Microsoft.AspNetCore.SignalR;

namespace margarita_app.Hubs;

public class RideHub: Hub, IDisposable
{
    private readonly ConnectionService _connectionService;
    public RideHub(ConnectionService connectionService, GameService gameService)
    {
        _connectionService = connectionService;
    }

    protected void NotifyRide(Ride ride)
    {
        var connectionIds = _connectionService.GetConnectionIdsForRide(ride);
        if (connectionIds.Count == 0)
        {
            return;
        }
        Clients.Clients(connectionIds).SendAsync("rideChanged", ride);
    }
    
    protected void NotifyRemoved(Ride ride)
    {
        var connectionIds = _connectionService.GetConnectionIdsForRide(ride);
        Clients.Clients(connectionIds).SendAsync("rideChanged", null);
    }

    public async Task SendMessage(string user, string message)
        => await Clients.All.SendAsync("ReceiveMessage", user, message);
    

    public void InitToken(string token)
    {
        _connectionService.RegisterConnection(Context.ConnectionId, token);
        
        Clients.Caller.SendAsync("rideChanged", null);
    }
}