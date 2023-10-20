using margarita_app.Misc;
using margarita_app.Services;
using margarita_data.Roles;
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
    public async Task LeaveLobby(string connectionToken)
    {
        var userId = _connectionService.GetUserIdByConnectionToken(connectionToken);
        await _gameService.LeaveLobby(userId);
    }
    
    [HttpGet("create/{userName}/{connectionToken}/{userId}", Name = nameof(CreateLobby))]
    public void CreateLobby(string userName, string connectionToken, string userId)
    {
        _connectionService.AddUserId(connectionToken, userId);
        _gameService.CreateLobby(userName, userId);
    }
    
    [HttpGet("start-game/{connectionToken}", Name = nameof(StartGame))]
    public async Task StartGame(string connectionToken)
    {
        var userId = _connectionService.GetUserIdByConnectionToken(connectionToken);
        await _gameService.StartGame(userId);
    }
}