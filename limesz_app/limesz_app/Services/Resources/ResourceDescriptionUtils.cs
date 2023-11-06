using System.Reflection;
using margarita_data.Models.AutoUI;

namespace margarita_app.Services;

public static class ResourceDescriptionUtils
{
    public static List<ResourceDescription> GetResourceDescriptions()
    {
        Type resourceServiceBaseName = typeof(SmartDataService<>);
        Type[] types = Assembly.GetAssembly(resourceServiceBaseName).GetTypes();
        var resourceTypes = new List<ResourceDescription>();
        foreach (var type in types)
        {
            var t = type.BaseType?.Name == resourceServiceBaseName.Name;
            if (type.BaseType != null && type.BaseType.IsGenericType && t)
            {
                Type modelType = type.BaseType.GetGenericArguments().FirstOrDefault();

                if (modelType != null)
                {
                    if (type.BaseType?.Name != typeof(SmartDataService<>).Name)
                    {
                        continue;
                    }
                    var description = GetResourceDescription(type, modelType);
                    resourceTypes.Add(description);
                }
            }
        }

        return resourceTypes;
    }

    private static ResourceDescription GetResourceDescription(Type type, Type genericType)
    {
        return new ResourceDescription()
        {
            Name = type.Name,
            Type = genericType.Name,
            Props = GetPropertyListOfType(genericType)
        };
    }

    public static List<ResourceProp> GetPropertyListOfType(Type type)
    {
        var props = new List<ResourceProp>();
        var properties = type.GetProperties();
        
        foreach (var property in properties)
        {
            props.Add(GetPropertyDefinition(property.Name, property.PropertyType));
        }
        return props;
    }
    public static ResourceProp GetPropertyDefinition(string name, Type propertyType)
    {
        var prop = new ResourceProp()
        {
            PropName = name,
            PropType = GetAtomicPropertyTypeName(propertyType)
        };
        
        if (prop.PropType == "list")
        {
            var genericType = propertyType.GetGenericArguments()[0];
            if (isPrimitiveType(genericType))
            {
                prop.EmbededTypeDefinition = GetAtomicPropertyTypeName(genericType);
            }
            else
            {
                prop.EmbededTypeDefinition = GetPropertyDefinition(genericType.Name, genericType);
            }
        }
        
        if (prop.PropType == "object")
        {
            prop.EmbededTypeDefinition = GetPropertyListOfType(propertyType);
        }

        return prop;
    }
    static bool isPrimitiveType(Type type)
    {
        var atomic = GetAtomicPropertyTypeName(type);
        if (atomic == "object" || atomic == "list" || atomic == "enum")
            return false;
        return true;
    }
    static string GetAtomicPropertyTypeName(Type type)
    {
        switch (type.Name)
        {
            case "String":
                return "string";
            case "Int32":
                return "number";
            case "Decimal":
                return "number";
            case "DateTime":
                return "date";
            case "Boolean":
                return "boolean";
            case "List`1":
                return "list";
            default:
                if (type.BaseType != null && type.BaseType.Name == "Enum")
                {
                    return "enum";
                }

                if (!type.IsPrimitive)
                    return "object";

                return "unknown";
        }
    }
}