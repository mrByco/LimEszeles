using System.Collections;
using System.Collections.Generic;
using System.Reflection;

namespace margarita_app.Misc
{
    public static class ObjectExtensions
    {
        //Copies the object properties recursively including lists
        public static void CopyProperties(this object source, object destination)
        {
            if (source == null || destination == null)
                throw new Exception("Source or/and Destination Objects are null");

            Type type = source.GetType();

            PropertyInfo[] props = type.GetProperties();
            foreach (PropertyInfo prop in props)
            {
                if (!prop.CanRead)
                    continue;
                if (!prop.CanWrite)
                    continue;
                if (prop.GetSetMethod(true) != null && prop.GetSetMethod(true).IsPrivate)
                    continue;
                if ((prop.GetSetMethod().Attributes & MethodAttributes.Static) != 0)
                    continue;
                if (!prop.PropertyType.IsAssignableFrom(prop.PropertyType))
                    continue;
                if (prop.GetValue(source) is null)
                    continue;

                if (prop.PropertyType.IsPrimitive || prop.GetValue(source) is string || prop.GetValue(source) is int || prop.GetValue(source) is float)
                {
                    prop.SetValue(destination, Convert.ChangeType(prop.GetValue(source), destination.GetType().GetProperty(prop.Name).PropertyType));
                    continue;
                }

                if (IsCollectionType(prop.PropertyType) && !(prop.GetValue(source) is string))
                {
                    List<object> sourceList = ((IEnumerable)prop.GetValue(source)).Cast<object>().ToList();
                    List<object> targetList = ((IEnumerable)prop.GetValue(destination))?.Cast<object>()?.ToList()??new List<object>();

                    bool hasId = prop.PropertyType.IsGenericParameter;
                    //If not has Id
                    if (prop.PropertyType.GetGenericArguments()[0].GetProperties().FirstOrDefault(p => p.Name == "Id") == null)
                    {
                        prop.SetValue(destination, prop.GetValue(source));
                    }
                    else
                    {
                        //Copy same elements
                        sourceList
                            .ForEach(e =>
                            {
                                var targetElement = targetList.FirstOrDefault(o =>
                                {
                                    var targetId = o.GetType().GetProperty("Id")!.GetValue(o);
                                    var sourceId = e.GetType().GetProperty("Id")!.GetValue(e);
                                    return targetId!.ToString() == sourceId!.ToString();
                                });
                                if (targetElement != null)
                                    e.CopyProperties(targetElement);
                                else
                                {
                                    var method = prop.GetValue(destination).GetType().GetMethod("Add");
                                    method.Invoke(prop.GetValue(destination), new[] { e });
                                }
                            });

                        targetList
                            .ForEach(t =>
                            {
                                var sourceElement = sourceList.FirstOrDefault(s =>
                                {
                                    var targetId = s.GetType().GetProperty("Id")!.GetValue(s);
                                    var sourceId = t.GetType().GetProperty("Id")!.GetValue(t);
                                    return targetId!.ToString() == sourceId!.ToString();
                                });
                                if (sourceElement == null)
                                {
                                    var method = prop.GetValue(destination).GetType().GetMethod("Remove");
                                    method.Invoke(prop.GetValue(destination), new[] { t });
                                }
                            });
                    }

                    continue;
                }
                else
                {
                    prop.GetValue(source).CopyProperties(prop.GetValue(destination));
                }


            }
        }
        static bool IsCollectionType(Type type)
        {
            return (type.GetInterface(nameof(IEnumerable)) != null);
        }
    }
}
