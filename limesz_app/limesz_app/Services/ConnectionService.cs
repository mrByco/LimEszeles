using margarita_app.Models;

namespace margarita_app.Services;

public class ConnectionService
{
    private List<ConnectionData> Connections { get; set; } = new List<ConnectionData>();
    
    public void RegisterConnection(string connectionId, string connectionToken)
    {
        var connection = this.Connections.FirstOrDefault(c => c.ConnectionId == connectionId);
        
        if (connection == null)
        {
            this.Connections.Add(new ConnectionData
            {
                ConnectionId = connectionId,
                ConnectionToken = connectionToken
            });
        }
        else
        {
            connection.ConnectionToken = connectionToken;
        }
    }

    public void AddUserId(string connectionToken, string userId)
    {
        var connection = this.Connections.FirstOrDefault(c => c.ConnectionToken == connectionToken);
        if (connection == null)
        {
            throw new Exception("Connection not found");
        }

        connection.UserId = userId;
    }
    
    public string GetConnectionByUserId(string userId)
    {
        return this.Connections.Find(c => c.UserId == userId)!.ConnectionId;
    }

    private class ConnectionData
    {
        public string ConnectionId { get; set; }
        public string ConnectionToken { get; set; }
        public string UserId { get; set; }
    }

    public List<string> GetConnectionIdsForRide(Ride ride)
    {
        return Connections
            .Where(c => ride.Players.ContainsKey(c.UserId??"no"))
            .Select(c => c.ConnectionId)
            .ToList();
    }

    public string GetConnectionIdByUserId(string userId)
    {
        return Connections.Find(c => c.UserId == userId)!.ConnectionId;
    }

    public string GetUserIdByConnectionId(string contextConnectionId)
    {
        return Connections.Find(c => c.ConnectionId == contextConnectionId).UserId;
    }

    public string GetUserIdByConnectionToken(string connectionToken)
    {
        return Connections.Find(c => c.ConnectionToken == connectionToken)?.UserId;
    }
}


