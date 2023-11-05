using System.Text.Json;
using System.Text.Json.Nodes;
using margarita_app.Services.Database;
using margarita_data.Models;
using margarita_data.Models.AutoUI;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace margarita_app.Services
{
    [Route("[controller]")]
    public abstract class BaseDataResourceService<T> : BaseDataService<T> where T : BaseRootModel, new()
    {
        protected BaseDataResourceService(IDatabaseService databaseService) : base(databaseService)
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
                SetPropertyByPath(obj, fieldUpdateRequest.Path, fieldUpdateRequest.Value);
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


        static void RemoveElementByIndex(object obj, string arrayPath, int index)
        {
            var properties = arrayPath.Split('.');
            var currentObject = obj;

            for (int i = 0; i < properties.Length - 1; i++)
            {
                var propertyName = properties[i];
                var propertyInfo = currentObject.GetType().GetProperty(propertyName);
                currentObject = propertyInfo.GetValue(currentObject);
            }

            var finalPropertyName = properties[properties.Length - 1];
            var finalPropertyInfo = currentObject.GetType().GetProperty(finalPropertyName);

            if (finalPropertyInfo != null && finalPropertyInfo.PropertyType.IsArray)
            {
                // If the final property is an array, we can remove the element at the desired index
                var array = (Array) finalPropertyInfo.GetValue(currentObject);
                var newArray = Array.CreateInstance(finalPropertyInfo.PropertyType.GetElementType(), array.Length - 1);
                for (int i = 0, j = 0; i < array.Length; i++)
                {
                    if (i != index)
                    {
                        newArray.SetValue(array.GetValue(i), j);
                        j++;
                    }
                }

                finalPropertyInfo.SetValue(currentObject, newArray);
            }
        }


        static void SetPropertyByPath(object obj, string path, object value)
        {
            var properties = path.Split('.');
            var currentObject = obj;
            
            
            JsonElement JsonElement = (JsonElement)value;
            value = GetValueFromJsonElement(JsonElement);

            for (int i = 0; i < properties.Length - 1; i++)
            {
                var propertyName = properties[i];
                var propertyInfo = currentObject.GetType().GetProperty(propertyName);
                currentObject = propertyInfo.GetValue(currentObject);
            }

            var finalPropertyName = properties[properties.Length - 1];
            var finalPropertyInfo = currentObject.GetType().GetProperty(finalPropertyName);

            if (finalPropertyInfo != null && finalPropertyInfo.PropertyType.IsArray)
            {
                // If the final property is an array, we can set the value at the desired index
                var index = int.Parse(finalPropertyName.Split('[')[1].TrimEnd(']'));
                var array = (Array) finalPropertyInfo.GetValue(currentObject);
                array.SetValue(value, index);
            }
            else
            {
                // DateTime is special, it is represented as special string on client side
                if (finalPropertyInfo.PropertyType == typeof(DateTime) && value is string)
                {
                    value = DateTime.Parse((string) value);
                }
                // Handle other non-array property types
                finalPropertyInfo.SetValue(currentObject, value);
            }
        }
        
        public static object GetValueFromJsonElement(JsonElement jsonElement)
        {
            switch (jsonElement.ValueKind)
            {
                case JsonValueKind.String:
                    return jsonElement.GetString();

                case JsonValueKind.Number:
                    if (jsonElement.TryGetInt32(out int intValue))
                    {
                        return intValue;
                    }
                    else if (jsonElement.TryGetDouble(out double doubleValue))
                    {
                        return doubleValue;
                    }
                    // Handle other numeric types as needed
                    break;

                case JsonValueKind.True:
                case JsonValueKind.False:
                    return jsonElement.GetBoolean();

                case JsonValueKind.Array:
                    var arrayValues = new List<object>();
                    foreach (var arrayElement in jsonElement.EnumerateArray())
                    {
                        arrayValues.Add(GetValueFromJsonElement(arrayElement));
                    }
                    return arrayValues;

                case JsonValueKind.Object:
                    var objectValues = new Dictionary<string, object>();
                    foreach (var property in jsonElement.EnumerateObject())
                    {
                        objectValues[property.Name] = GetValueFromJsonElement(property.Value);
                    }
                    return objectValues;

                default:
                    return jsonElement.ToString();
            }

            return null; // Handle unsupported types or errors
        }
    }
    
    
}