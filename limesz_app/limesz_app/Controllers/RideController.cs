using cardsplusplus.Abstraction;
using margarita_app.Hubs;
using margarita_app.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace margarita_app.Controllers;

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