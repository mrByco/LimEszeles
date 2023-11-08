using MongoDB.Driver;

namespace margarita_app.Services.Database
{
    public interface IDatabaseService
    {
        public IMongoDatabase MongoDatabase { get; }
    }
}
