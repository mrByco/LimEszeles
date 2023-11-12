using MongoDB.Driver;

namespace pluto.Services.Database
{
    public interface IMongoDatabaseService
    {
        public IMongoDatabase MongoDatabase { get; }
    }
}
