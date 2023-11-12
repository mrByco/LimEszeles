using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using Pluto.Models;
using Pluto.Models.ResourceDescription;
using pluto.PlutoRepo.Implementations;
using pluto.Services.Database;
using pluto.Services.Resources;

namespace pluto.PlutoRepo
{
    [Route("pl/resources")]
    public abstract class PlutoSmartRepo<T> : MongoBaseRepositoryImpl<T> where T : BaseRootModel, new()
    {
        
        protected PlutoSmartRepo(IMongoDatabaseService mongoDatabaseService) : base(mongoDatabaseService)
        {
        }

        // Should only called from ResourceController though reflection
        public PaginatedResourceResult GetPaginatedResource(int page, int count)
        {
            List<object> data = _collection.Find(_ => true).Skip(page * count).Limit(count).ToList()
                .Select(s => (object) s).ToList();
            var total = _collection.Find(_ => true).CountDocuments();
            return new PaginatedResourceResult()
            {
                Data = data,
                Total = (int) total
            };
        }

        // Should only called from ResourceController though reflection
        public object? GetByIdResource(string id)
        {
            return Get(id);
        }

        public object? CreateResource()
        {
            // instantiate a new object of type T
            var instance = new T();
            return Create(instance);
        }

        // Sets a single primitive type at a time
        public object UpdateResource(string id, List<FieldChange> fieldUpdateRequests)
        {
            var obj = Get(id);
            foreach (var fieldUpdateRequest in fieldUpdateRequests)
            {
                var value = UpdateObjectUtils.JsonElementToValue(fieldUpdateRequest.Value);
                UpdateObjectUtils.ResolveAndSetPropertyByPath(obj, fieldUpdateRequest.Path, value);
            }
            Update(obj);
            return obj;
        }

        public object AddNestedListItemResource(string id, string path, object listItem)
        {
            var obj = new object();
            return new object();
        }

        public object RemoveNestedListItemResource(string id, string path)
        {
            var obj = new object();
            return new object();
        }

        public void RemoveResource(string id)
        {
            Remove(id);
        }
    }
    
    
}