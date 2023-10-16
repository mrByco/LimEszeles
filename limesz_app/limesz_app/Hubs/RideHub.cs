



using margarita_app.Models;
using margarita_app.Services;
using Microsoft.AspNetCore.SignalR;

namespace margarita_app.Hubs;

public class RideHub: Hub
{
    private readonly ConnectionService _connectionService;
    private readonly GameService _gameService;
    public RideHub(ConnectionService connectionService, GameService gameService)
    {
        _connectionService = connectionService;
        _gameService = gameService;
    }
    public async Task SendMessage(string user, string message)
        => await Clients.All.SendAsync("ReceiveMessage", user, message);
    

    public void InitToken(string token)
    {
        _connectionService.RegisterConnection(Context.ConnectionId, token);
        
        Clients.Caller.SendAsync("rideChanged", null);
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        var userId = _connectionService.GetUserIdByConnectionId(Context.ConnectionId);
        _gameService.LeaveLobby(userId);
        return base.OnDisconnectedAsync(exception);
    }
}