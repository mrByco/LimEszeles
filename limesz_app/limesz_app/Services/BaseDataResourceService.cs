using margarita_app.Services.Database;
using margarita_data.Models;
using margarita_data.Models.AutoUI;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace margarita_app.Services
{
    [Route("[controller]")]
    public abstract class BaseDataResourceService<T>: BaseDataService<T> where T: BaseRootModel
    {
        protected BaseDataResourceService(IDatabaseService databaseService) : base(databaseService)
        {
        }

        // Should only called from ResourceController though reflection
        public PaginatedResourceResult GetPaginatedResource(int page, int count)
        {
            List<object> data = _collection.Find(_ => true).Skip(page * count).Limit(count).ToList().Select(s => (object)s).ToList();
            var total = _collection.Find(_ => true).CountDocuments();
            return new PaginatedResourceResult()
            {
                Data = data,
                Total = (int)total
            };
        }

        // Should only called from ResourceController though reflection
        public object? GetByIdResource(string id)
        {
            return Get(id);
        }
        
        public object? CreateResource(object model)
        {
            var m = (T)model;
            return Create(m);
        }
        
        // Sets a single primitive type at a time
        public object UpdateResource(string id, FieldUpdateRequest fieldUpdateRequest)
        {
            var m = (T)new object();
            Update(m);
            return m;
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

    public class FieldUpdateRequest
    {
        public string Path { get; set; }
        public object Value { get; set; }
    }
}
