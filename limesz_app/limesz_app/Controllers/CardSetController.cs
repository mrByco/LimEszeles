using limesz_app.Services;
using margarita_data.Models;
using Microsoft.AspNetCore.Mvc;

namespace limesz_app.Controllers;

[Route("[controller]")]
[ApiController]
public class CardSetController: ControllerBase
{
    [HttpGet("get-card-set-list", Name = nameof(GetCardSetList))]
    public List<CardSet> GetCardSetList()
    {
        return CardSetService.GetCardSets();
    }
}