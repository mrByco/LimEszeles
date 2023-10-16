using margarita_app.Services;
using Microsoft.AspNet.SignalR.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace margarita_app.Controllers;

[Route("[controller]")]
[ApiController]
public class LobbyController: ControllerBase
{
    private readonly GameService _gameService;
    private readonly ConnectionService _connectionService;
    public LobbyController(GameService gameService, ConnectionService connectionService)
    {
        _gameService = gameService;
        _connectionService = connectionService;
    }
    

    [HttpGet("join/{lobbyId}/{userName}/{userId}/{connectionToken}", Name = nameof(JoinLobby))]
    public void JoinLobby(string lobbyId, string userName, string userId, string connectionToken)
    {
        _connectionService.AddUserId(connectionToken, userId);
        _gameService.JoinLobby(userName, userId, lobbyId);
    }
    
    [HttpGet("leave/{connectionToken}", Name = nameof(LeaveLobby))]
    public void LeaveLobby(string connectionToken)
    {
        var userId = _connectionService.GetUserIdByConnectionToken(connectionToken);
        _gameService.LeaveLobby(userId);
    }
    
    [HttpGet("create/{userName}/{connectionToken}/{userId}", Name = nameof(CreateLobby))]
    public void CreateLobby(string userName, string connectionToken, string userId)
    {
        _connectionService.AddUserId(connectionToken, userId);
        _gameService.CrateRide(userName, userId);
    }
    
}