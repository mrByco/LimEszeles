using margarita_app.Misc;
using margarita_data.Models;
using Mongo2Go;
using Mongo2Go.Helper;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Security.Cryptography;

namespace margarita_app.Services.Database
{
    public class FakeMongoDatabaseService : IMongoDatabaseService
    {

        internal static MongoDbRunner _runner;
        protected readonly string DatabaseName = "application";
        public readonly MongoClient MongoClient;
        public IMongoDatabase MongoDatabase { get; }
        private readonly IWebHostEnvironment _environment;
        private readonly string TEST_DATA_PATH = "TestData";

        public FakeMongoDatabaseService(IWebHostEnvironment environment)
        {
            _environment = environment;
            
            _runner = MongoDbRunner.StartForDebugging();

            System.Console.WriteLine($"Join to fake database with: '{_runner.ConnectionString}'");

            MongoClient = new MongoClient(_runner.ConnectionString);
            MongoDatabase = MongoClient.GetDatabase(DatabaseName);
            ResetData();
        }

        private void ResetData()
        {
            DropAllData();

            var testDataPath = Path.Combine(_environment.ContentRootPath, TEST_DATA_PATH);
            var dataFileNames = Directory.GetFiles(testDataPath).Where(f => f.EndsWith(".json"));
            FillCollections(testDataPath, dataFileNames);

        }

        private void FillCollections(string testDataPath, IEnumerable<string> dataFileNames)
        {
            Parallel.ForEach(dataFileNames, (filename) => {
                var collectionName = Path.GetFileNameWithoutExtension(filename);
                this.MongoDatabase.CreateCollection(collectionName);

                _runner.Import(DatabaseName, collectionName, filename, true);

                var collection = MongoDatabase.GetCollection<BsonDocument>(collectionName);


                var text = File.ReadAllText(Path.Combine(testDataPath, filename));

                var documentStrings = JsonConvert.DeserializeObject<List<JObject>>(text).Select(d => JsonConvert.SerializeObject(d));
                var documents = documentStrings.Select(s => BsonDocument.Parse(s));
                if (documents.Count() > 0)
                    collection.InsertMany(documents);
            });

        }
        

        private void DropAllData()
        {
            var collectionNames = MongoDatabase.ListCollectionNames().ToList();
            foreach (var collectionName in collectionNames)
            {
                MongoDatabase.DropCollection(collectionName);
            }
        }

    }
}
