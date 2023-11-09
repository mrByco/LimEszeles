using System.Reflection;
using margarita_app.Misc;
using margarita_data.Models.AutoUI;
using margarita_data.Models.AutoUI.ResourceAnnotation;

namespace margarita_app.Services;

public static class ResourceDescriptionUtils
{
    public static List<ResourceDescription> GetResourceDescriptions()
    {
        Type resourceServiceBaseName = typeof(PlutoSmartRepo<>);
        Type[] types = PlutoConfig.BindingAssembly.GetTypes();
        var resourceTypes = new List<ResourceDescription>();
        foreach (var type in types)
        {
            var t = type.BaseType?.Name == resourceServiceBaseName.Name;
            if (type.BaseType != null && type.BaseType.IsGenericType && t)
            {
                Type modelType = type.BaseType.GetGenericArguments().FirstOrDefault();

                if (modelType != null)
                {
                    if (type.BaseType?.Name != typeof(PlutoSmartRepo<>).Name)
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

    private static ResourceDescription GetResourceDescription(Type resourceType, Type modelType)
    {
        var description = new ResourceDescription()
        {
            Name = resourceType.Name,
            Type = modelType.Name,
            Props = GetPropertyListOfType(modelType),
            DescriptionOptions = GetResourceDescriptionOptions(modelType)
        };
        var idProp = description.Props.FirstOrDefault(x => x.PropName == "Id");
        if (idProp != null)
        {
            idProp.PropOptions.IsSelfId = true;
            idProp.PropOptions.SetReadOnly();
        }
        return description;
    }

    private static ResourceDescriptionOptions GetResourceDescriptionOptions(Type model)
    {
        var properties = model.GetProperties();
        var options = new ResourceDescriptionOptions();
        var attr = model.GetCustomAttribute<StringRepresentationAttribute>();
        
        if (attr != null)
            options.StringRepresentationFieldName = attr.Name.toJSAccessorName();
        
        return options;
    }

    public static List<ResourceProp> GetPropertyListOfType(Type modelType)
    {
        var props = new List<ResourceProp>();
        var properties = modelType.GetProperties();
        
        foreach (var property in properties)
        {
            props.Add(GetPropertyDefinition(property.Name, property.PropertyType, property));
        }
        return props;
    }
    public static ResourceProp GetPropertyDefinition(string name, Type type, PropertyInfo? propertyInfo = null)
    {
        
        var prop = new ResourceProp()
        {
            PropName = name,
            PropType = GetAtomicPropertyTypeName(type)
        };

        if (prop.PropType == "string" && propertyInfo?.GetCustomAttribute<ForeignKeyAttribute>() != null)
        {
            var key = propertyInfo?.GetCustomAttribute<ForeignKeyAttribute>();
            prop.PropType = "reference";
            prop.EmbededTypeDefinition = key?.ForeignResourceType.Name;
        }

        if (propertyInfo != null)
            ProcessPropertySpecificOptions(propertyInfo, prop.PropOptions);
        ProcessTypeSpecificPropertyOptions(type, prop.PropOptions);
        
        if (prop.PropType == "list")
        {
            var genericType = type.GetGenericArguments()[0];
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
            prop.EmbededTypeDefinition = GetPropertyListOfType(type);
        }

        return prop;
    }

    private static void ProcessPropertySpecificOptions(PropertyInfo info, ResourcePropOptions options)
    {
        if (!info.CanWrite || !info.GetSetMethod(/*nonPublic*/ true).IsPublic)
            options.SetReadOnly();
        
        var foreignKey = info.GetCustomAttribute<ForeignKeyAttribute>();
        
        options.ForeignKeyOf = foreignKey?.ForeignResourceType.Name;
    }
    
    private static void ProcessTypeSpecificPropertyOptions(Type type, ResourcePropOptions options)
    {
        var attr = type.GetCustomAttribute<StringRepresentationAttribute>();
        
        if (attr != null)
            options.StringRepresentationFieldName = attr.Name.toJSAccessorName();
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