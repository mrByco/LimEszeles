using System.Linq.Expressions;
using MongoDB.Bson;
using MongoDB.Driver;
using Pluto.Models;
using pluto.Services.Database;

namespace pluto.PlutoRepo.Implementations
{
    public abstract class MongoBaseRepositoryImpl<T>: IPlutoBaseRepositoryImpl<T> where T: BaseRootModel
    {
        protected abstract string CollectionName { get; }


        protected readonly IMongoCollection<T> _collection;

        public MongoBaseRepositoryImpl(IMongoDatabaseService mongoDatabaseService)
        {
            _collection = mongoDatabaseService.MongoDatabase.GetCollection<T>(CollectionName);
        }

        public List<T> Get() => _collection.Find(_ => true).ToList();
        public List<T> Get(Expression<Func<T, bool>> expr) => _collection.Find(expr).ToList();
        public List<T> Get(Expression<Func<T, bool>> expr, int page, int count) =>
            _collection.Find(expr).Skip(page * count).Limit(count).ToList();
        public List<T> Get(FilterDefinition<T> expr) => _collection.Find(expr).ToList();
        public List<T> Get(FilterDefinition<T> expr, int page, int count) =>
            _collection.Find(expr).Skip(page * count).Limit(count).ToList();

        public virtual T? Get(string id) =>
            _collection.Find(x => x.Id == id).FirstOrDefault();


        public virtual T Create(T model)
        {
            ObjectId objectId = ObjectId.GenerateNewId();
            model.Id = objectId.ToString();
            _collection.InsertOne(model);
            return model;
        }

        public virtual void Update(T model) =>
            _collection.ReplaceOne(x => x.Id == model.Id, model);

        public virtual void Remove(string id) =>
            _collection.DeleteOne(x => x.Id == id);
    }
}

