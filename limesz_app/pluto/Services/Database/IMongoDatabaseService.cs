using MongoDB.Driver;

namespace margarita_app.Services.Database
{
    public interface IMongoDatabaseService
    {
        public IMongoDatabase MongoDatabase { get; }
    }
}
