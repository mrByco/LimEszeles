using MongoDB.Driver;
using pluto.Misc;

namespace pluto.Services.Database
{
    public class MongoDatabaseService: IMongoDatabaseService
    {
        protected readonly string DatabaseName = "application";
        public readonly MongoClient MongoClient;
        public IMongoDatabase MongoDatabase { get; }
        

        public MongoDatabaseService()
        {
            var mongoConnectionString = PlutoConfig.Instance.MongoConnectionString;
            MongoClient = new MongoClient(mongoConnectionString);
            MongoDatabase = MongoClient.GetDatabase(DatabaseName);
        }
    }
}

