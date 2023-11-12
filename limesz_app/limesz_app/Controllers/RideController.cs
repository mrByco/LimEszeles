using limesz_app.Misc.GameLogic.Abstraction;
using Microsoft.AspNetCore.Mvc;

namespace limesz_app.Controllers;

[Route("[controller]")]
[ApiController]
public class RideController: ControllerBase
{
    
    [HttpGet("{rideId}")]
    public Ride GetRide(string rideId)
    {
        return new Ride();
    }

    [HttpGet("gmae")]
    public Ride GG(string rideId)
    {
        return new Ride();
    }
    
    
    
}