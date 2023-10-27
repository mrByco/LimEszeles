



using cardsplusplus.Abstraction;
using margarita_app.Models;
using margarita_app.Services;
using Microsoft.AspNetCore.Server.IIS.Core;
using Microsoft.AspNetCore.SignalR;

namespace margarita_app.Hubs;

public class RideHub: Hub
{
    private readonly ConnectionService _connectionService;
    private readonly GameService _gameService;
    
    
    private readonly Dictionary<string, string> _timeoutTokensPerConnectionToken = new ();
    public RideHub(ConnectionService connectionService, GameService gameService)
    {
        _connectionService = connectionService;
        _gameService = gameService;
    }
    public async Task SendMessage(string user, string message)
        => await Clients.All.SendAsync("ReceiveMessage", user, message);
    

    public void InitToken(string token)
    {
        Ride? currentRide = null;
        // CHECK if user is reconnected
        var recoveredConnectionData = _connectionService.GetTimeoutConnectionData(token);
        if (recoveredConnectionData != null)
        {
            try
            {
                _connectionService.ReconnectPlayer(token, Context.ConnectionId);
                currentRide = _gameService.ReconnectPlayer(recoveredConnectionData.UserId);
                this._timeoutTokensPerConnectionToken.Remove(recoveredConnectionData.ConnectionToken);
            }
            catch (Exception e)
            {
                _connectionService.RegisterConnection(Context.ConnectionId, token);
                Console.WriteLine(e);
            }
        }
        else
        {
            _connectionService.RegisterConnection(Context.ConnectionId, token);
        }

        Clients.Caller.SendAsync("rideChanged", currentRide);
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        var connectionToken = _connectionService.Connections.Find(c => c.ConnectionId == Context.ConnectionId)?.ConnectionToken;
        if (connectionToken != null)
        {
            await StartTimeout(connectionToken);
        }
        await base.OnDisconnectedAsync(exception);
    }

    public async Task StartTimeout(string connectionToken)
    {
        var timeoutId = Guid.NewGuid().ToString();
        _timeoutTokensPerConnectionToken.Add(connectionToken, timeoutId);
        _connectionService.ConnectionLost(connectionToken);
        await Task.Delay(2000);
        if (_timeoutTokensPerConnectionToken.ContainsKey(connectionToken) && this._timeoutTokensPerConnectionToken[connectionToken] == timeoutId)
        {
            var userId = _connectionService.GetTimeoutConnectionData(connectionToken).UserId;
            await _gameService.LeaveLobby(userId);
            _connectionService.Timout(connectionToken);
        }
    }
}