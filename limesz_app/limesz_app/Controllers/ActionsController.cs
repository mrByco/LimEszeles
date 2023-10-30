using margarita_app.Services;
using Microsoft.AspNetCore.Mvc;

namespace margarita_app.Controllers;

[Route("[controller]")]
[ApiController]
public class ActionsController: ControllerBase
{
    private readonly GameService _gameService;
    
    public ActionsController(GameService gameService)
    {
        _gameService = gameService;
    }
    
    //TODO Make annimous login safe
    [HttpGet("play/{userId}/{cardId}", Name = nameof(PlayCard))]
    public void PlayCard(string userId, string cardId)
    {
        _gameService.PlayCard(cardId, userId);
    }
    
    [HttpGet("pull/{userId}/{deckName}/{count}", Name = nameof(PullFromDeck))]
    public void PullFromDeck(string userId, string deckName, int count)
    {
        _gameService.PullFromDeck(userId, deckName, count);
    }

    [HttpPost("answer-prompt/{userId}/{showToken}", Name = nameof(AnswerPrompt))]
    public void AnswerPrompt(string userId, string showToken, Dictionary<string, object> result)
    {
        _gameService.AnswerPrompt(userId, showToken, result);
    }
}