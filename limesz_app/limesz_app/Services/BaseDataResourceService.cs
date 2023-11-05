using System.Collections;
using System.Reflection;
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
        private static readonly Dictionary<Type, Func<object>> createDefaultInstance = new Dictionary<Type, Func<object>>()
        {
            {typeof(string), () => ""},
            {typeof(int), () => 0},
            {typeof(double), () => 0.0},
            {typeof(bool), () => false},
            {typeof(DateTime), () => new DateTime()},
            {typeof(List<>), () => new List<object>()},
        };
        
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
            JsonElement JsonElement = (JsonElement)value;
            value = GetValueFromJsonElement(JsonElement);
            
            var pathSegments = path.Split('.');
            List<dynamic> accessList = new List<dynamic>();

            foreach (string segment in pathSegments)
            {
                if (segment.Contains("["))
                {
                    var arrayName = segment.Split('[')[0];
                    int index = int.Parse(segment.Split('[')[1].TrimEnd(']'));
                    accessList.Add(arrayName);
                    accessList.Add( index);
                }
                else
                {
                    accessList.Add(segment);
                }
            }
            var currentObject = obj;
            
            object previousObject = null;
            PropertyInfo propertyInfo = null;

            for (int i = 0; i < accessList.Count - 1; i++)
            {
                previousObject = currentObject!;
                if (accessList[i] is string)
                {
                    var propertyName = accessList[i];
                    propertyInfo = currentObject.GetType().GetProperty(propertyName);
                    
                    // TODO CHECK PERMISSION TO CREATE OBJECT
                    
                    currentObject = propertyInfo.GetValue(currentObject);
                    if (currentObject == null && propertyInfo != null)
                    {
                        currentObject = Activator.CreateInstance(propertyInfo.PropertyType);
                        propertyInfo.SetValue(previousObject, currentObject);
                    }
                    
                }
                else if (accessList[i] is int)
                {
                    var array = (currentObject as IList);
                    currentObject = array[accessList[i]];
                    
                }
            }

            var finalPropertyName = accessList[accessList.Count - 1];


            Type targetType;
            if (finalPropertyName is string)
            {
                
                
                
                var finalPropertyInfo = currentObject.GetType().GetProperty(finalPropertyName);
                targetType = finalPropertyInfo.PropertyType;
            }
            else
            {
                targetType = currentObject.GetType().GetGenericArguments()[0];
            }
            
            // DateTime is special, it is represented as special string on client side
            if (targetType == typeof(DateTime) && value is string)
            {
                value = DateTime.Parse((string) value);
            }
            
            
            if (finalPropertyName is int arrayIndex)
            {
                var list = currentObject as IList;
                
                //TODO Create permission
                if (list == null)
                {
                    Type genericType = propertyInfo.PropertyType.GenericTypeArguments[0];
                    list = (IList)Activator.CreateInstance(typeof(List<>).MakeGenericType(genericType));
                    propertyInfo.SetValue(previousObject, list);
                }
                
                if (value is string command && command.StartsWith("$") && command.EndsWith("$") && command.Length > 1)
                {
                    if (command == "$INSERT$")
                    {
                        var parameterless = targetType.GetConstructors().Any(c => c.GetParameters().Length == 0);
                        if (createDefaultInstance.ContainsKey(targetType))
                        {
                            var defaultInstance = createDefaultInstance[targetType]();
                            list.Add(defaultInstance);
                        }
                        else if (parameterless)
                        {
                            list.Add(Activator.CreateInstance(targetType));
                            
                        }
                        else
                        {
                            throw new("Cannot insert into list, no default constructor found for" +
                                      targetType.Name);
                        }
                    }
                    else if (command == "$REMOVE$")
                    {
                        list.RemoveAt(list.Count - 1);
                    }
                }
                else
                {
                    list[arrayIndex] = value;
                }
            }
            else
            {
                
                // Set the final property
                var finalPropertyInfo = currentObject.GetType().GetProperty(finalPropertyName);
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
        
        public void SetIEnumerableValue(object target, string propertyName, object value)
        {
            var property = target.GetType().GetProperty(propertyName);
            var propertyType = property.PropertyType;

            //is it enumerable?
            if (typeof(IEnumerable).IsAssignableFrom(propertyType))
            {
                var objectType = propertyType.GetGenericArguments().First();

                //var list = Activator.CreateInstance(typeof(List<>).MakeGenericType(objectType)) as IList;
                
                var list = new List<object>();
                list[2] = "";

                foreach(var item in list)
                {
                    var obj = Activator.CreateInstance(objectType) ;
                    //((IHasId)obj).Id = id;

                    //list.Add(obj);
                }

                property.SetValue(target, list);
            }
        }  
    }
    
    
}