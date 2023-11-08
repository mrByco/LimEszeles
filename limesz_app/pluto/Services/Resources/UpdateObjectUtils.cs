using System.Collections;
using System.Reflection;
using System.Text.Json;

namespace margarita_app.Services;

public static class UpdateObjectUtils
{
        /// <summary>
        /// Parameterless constructors for default values
        /// </summary>
        private static readonly Dictionary<Type, Func<object>> createDefaultInstance = new Dictionary<Type, Func<object>>()
        {
            {typeof(string), () => ""},
            {typeof(int), () => 0},
            {typeof(double), () => 0.0},
            {typeof(bool), () => false},
            {typeof(DateTime), () => new DateTime()},
            {typeof(List<>), () => new List<object>()},
        };

        public static void ResolveAndSetPropertyByPath(object obj, string path, object value)
        {
            // Split by dot, then by square brackets, then recover square brackets
            var accessList = BuildAccessList(path);
            
            ResolvedPropertyParams resolveResult = ResolvePropertyPath(obj, accessList);

            var finalPropertyName = accessList[accessList.Count - 1];
            SetPropertyOnObject(value, finalPropertyName, resolveResult.currentObject, resolveResult.ContainerPropertyInfo, resolveResult.ContainerObject);
        }

        private static ResolvedPropertyParams ResolvePropertyPath(object obj, List<dynamic> accessList)
        {
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

            return new ResolvedPropertyParams()
            {
                currentObject = currentObject!,
                ContainerPropertyInfo = propertyInfo!,
                ContainerObject = previousObject!
            };
        }

        /// <summary>
        /// Actually sets the property on the object
        /// </summary>
        /// <param name="value"></param>
        /// <param name="targetPropertyName"></param>
        /// <param name="targetObject"></param>
        /// <param name="containerObject"></param>
        /// <param name="containerPropertyInfo"></param>
        /// <exception cref="Exception"></exception>
        private static void SetPropertyOnObject(object value, dynamic targetPropertyName, object targetObject,
            PropertyInfo? containerPropertyInfo, object? containerObject)
        {
            Type targetType = GetAndParseSpecialTargetType(ref value, targetPropertyName, targetObject);
            
            if (targetPropertyName is int arrayIndex)
            {
                var list = targetObject as IList;

                //TODO Create permission
                if (list == null)
                {
                    Type genericType = containerPropertyInfo.PropertyType.GenericTypeArguments[0];
                    list = (IList)Activator.CreateInstance(typeof(List<>).MakeGenericType(genericType));
                    containerPropertyInfo.SetValue(containerObject, list);
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
                        list.RemoveAt(arrayIndex);
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
                var finalPropertyInfo = targetObject.GetType().GetProperty(targetPropertyName);
                // Handle other non-array property types
                finalPropertyInfo.SetValue(targetObject, value);
            }
        }

        /// <summary>
        /// Gets the target property type by its name
        /// </summary>
        /// <param name="value">Value to set the property, can modify it in for example in the case of DateTime</param>
        /// <param name="targetPropertyName">Target property to set</param>
        /// <param name="targetObject">Object to set the property on</param>
        /// <returns></returns>
        private static Type GetAndParseSpecialTargetType(ref object value, dynamic targetPropertyName, object targetObject)
        {
            Type targetType = GetTargetType(targetPropertyName, targetObject);
            ParseSpecialTargetTypes(ref value, targetType);
            return targetType;
        }

        /// <summary>
        /// Modifies the value type if needed, for example DateTime is represented as string on client side
        /// </summary>
        /// <param name="value"></param>
        /// <param name="targetType"></param>
        private static void ParseSpecialTargetTypes(ref object value, Type targetType)
        {
            // DateTime is special, it is represented as special string on client side
            if (targetType == typeof(DateTime) && value is string)
            {
                value = DateTime.Parse((string)value);
            }
        }

        /// <summary>
        /// Get property type by its name
        /// </summary>
        /// <param name="propertyName"></param>
        /// <param name="currentObject"></param>
        /// <returns></returns>
        private static Type GetTargetType(dynamic propertyName, object currentObject)
        {
            Type targetType;
            if (propertyName is string)
            {
                var finalPropertyInfo = currentObject.GetType().GetProperty(propertyName);
                targetType = finalPropertyInfo.PropertyType;
            }
            else
            {
                targetType = currentObject.GetType().GetGenericArguments()[0];
            }

            return targetType;
        }
        

        /// <summary>
        /// Converts the javascript notated PropertyPath to a List
        /// </summary>
        /// <param name="path"></param>
        /// <returns>The path in a List Like { "prop1", 1, "anotherProp" }, with mixed data types</returns>
        private static List<dynamic> BuildAccessList(string path)
        {
            var pathSegments = path.Split('.');
            List<dynamic> accessList = new List<dynamic>();

            foreach (string segment in pathSegments)
            {
                if (segment.Contains("["))
                {
                    var arrayName = segment.Split('[')[0];
                    accessList.Add(arrayName);

                    List<string> indexParts = segment.Split('[').Select(s => s.TrimEnd(']')).ToList();
                    indexParts.RemoveAt(0);

                    var indexPartsAsInt = indexParts.Select(s => int.Parse(s));
                    indexPartsAsInt.ToList().ForEach(i => accessList.Add(i));
                    
                }
                else
                {
                    accessList.Add(segment);
                }
            }

            return accessList;
        }

        public static object JsonElementToValue(object value)
        {
            JsonElement JsonElement = (JsonElement)value;
            value = GetValueFromJsonElement(JsonElement);
            return value;
        }

        static object GetValueFromJsonElement(JsonElement jsonElement)
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