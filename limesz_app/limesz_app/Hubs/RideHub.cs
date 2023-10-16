



using margarita_app.Models;
using Microsoft.AspNetCore.SignalR;
using MongoDB.Bson.Serialization.Serializers;

namespace margarita_app.Hubs;

public class RideHub: Hub
{
    
    private Dictionary<string, string> connectionIdMap = new Dictionary<string, string>();

    public async Task SendMessage(string user, string message)
        => await Clients.All.SendAsync("ReceiveMessage", user, message);
    

    public void InitId(string id)
    {
        this.connectionIdMap.Add(id, Context.ConnectionId);
        
        Clients.Caller.SendAsync("rideChanged", null);
        
    }
    
    public override Task OnDisconnectedAsync(Exception? exception)
    {
        return base.OnDisconnectedAsync(exception);
    }
    
    
}