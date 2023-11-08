
using System;
using margarita_app.Misc;
using MongoDB.Driver;

namespace margarita_app.Services.Database
{
    public class DatabaseService: IDatabaseService
    {
        protected readonly string DatabaseName = "application";
        public readonly MongoClient MongoClient;
        public IMongoDatabase MongoDatabase { get; }
        

        public DatabaseService()
        {
            var mongoConnectionString = PlutoConfig.Instance.MongoConnectionString;
            MongoClient = new MongoClient(mongoConnectionString);
            MongoDatabase = MongoClient.GetDatabase(DatabaseName);
        }
    }
}

