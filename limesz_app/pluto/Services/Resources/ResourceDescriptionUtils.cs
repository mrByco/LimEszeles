using System.Diagnostics.CodeAnalysis;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Text;
using pluto.Misc;
using Pluto.Misc;
using Pluto.Models;
using Pluto.Models.ResourceAnnotation;
using Pluto.Models.ResourceDescription;
using pluto.PlutoRepo;

namespace pluto.Services.Resources;

public static class ResourceDescriptionUtils
{
    public static List<ResourceDescription> GetResourceDescriptions()
    {
        Type resourceServiceBaseName = typeof(PlutoSmartRepo<>);
        var types = PlutoConfig.BindingAssembly
            .GetTypes()
            .Concat(Assembly.GetExecutingAssembly().GetTypes())
            .Concat(typeof(BaseRootModel).Assembly.GetTypes())
            .ToList();
        
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
                    var description = GetResourceDescription(type.Name, modelType);
                    resourceTypes.Add(description);
                }
            }

            if (type.GetCustomAttribute<StandaloneResourceAttribute>() != null)
            {
                var description = GetResourceDescription(type.Name, type);
                resourceTypes.Add(description);
            }
        }

        return resourceTypes;
    }

    private static ResourceDescription GetResourceDescription(string resourceName, Type modelType)
    {
        var description = new ResourceDescription()
        {
            Name = resourceName,
            Type = modelType.Name,
            Props = GetPropertyListOfType(modelType, ""),
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

    public static List<ResourceProp> GetPropertyListOfType(Type modelType, string path)
    {
        var props = new List<ResourceProp>();
        var properties = modelType.GetProperties();
        
        foreach (var property in properties)
        {
            props.Add(GetPropertyDefinition(property.Name, property.PropertyType, AppendPath(path, property.Name.toJSAccessorName()),  property));
        }
        return props;
    }
    public static ResourceProp GetPropertyDefinition(string name, Type type, string path, PropertyInfo? propertyInfo = null)
    {
       

        var prop = new ResourceProp()
        {
            PropName = name,
            PropType = GetAtomicPropertyTypeName(type),
            // Handle the edge case when there is a list in a list
            FullJsAccessor = path
        };

        prop.Id = GetId(prop.FullJsAccessor);

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
            prop.FullJsAccessor = AddListSuffix(prop.FullJsAccessor);
            if (isPrimitiveType(genericType))
            {
                prop.EmbededTypeDefinition = GetAtomicPropertyTypeName(genericType);
            }
            else
            {
                prop.EmbededTypeDefinition = GetPropertyDefinition(genericType.Name, genericType, prop.FullJsAccessor);
            }
        }
        
        if (prop.PropType == "object")
        {
            prop.EmbededTypeDefinition = GetPropertyListOfType(type, path);
        }

        return prop;
    }
    
    private static string AddListSuffix(string path)
    {
        var shortHash = GetId(path);
        return $"{path}[{shortHash}]";
    }

    /// <summary>
    /// Returns an id, unique to the path, per base root model
    /// </summary>
    /// <param name="path"></param>
    /// <returns></returns>
    private static string GetId(string path)
    {
        if (string.IsNullOrEmpty(path))
        {
            return "";
        }
        var hash = HashString(path);
        hash = hash.Substring(0, 6);
        
        return $"$ID_{hash}$";
    }

    private static string AppendPath(string path, string name)
    {
        if (path == "")
            return name;
        return path + "." + name;
    }

    private static void ProcessPropertySpecificOptions(PropertyInfo info, ResourcePropOptions options)
    {
        if (!info.CanWrite || !info.GetSetMethod(/*nonPublic*/ true).IsPublic)
            options.SetReadOnly();
        
        var foreignKey = info.GetCustomAttribute<ForeignKeyAttribute>();
        options.ForeignKeyOf = foreignKey?.ForeignResourceType.Name;
        
        var nullable = info.GetCustomAttribute<CanSetNullAttribute>();
        options.isNullable = nullable != null;
    }
    
    private static void ProcessTypeSpecificPropertyOptions(Type type, ResourcePropOptions options)
    {
        var attr = type.GetCustomAttribute<StringRepresentationAttribute>();
        
        if (attr != null)
            options.StringRepresentationFieldName = attr.Name.toJSAccessorName();
    }
    
    static bool IsNullable(Type type)
    {
        var nullableAttribute = type.GetCustomAttributes();

        var names = nullableAttribute.Select(a => a.GetType().Name);
        var NullableContextAttribute = names.Contains("NullableContextAttribute");
        var NullableAttribute = names.Contains("NullableAttribute");
        // Check if the type is a generic type
        

        return NullableAttribute;
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
    
    static string HashString(string text, string salt = "")
    {
        if (String.IsNullOrEmpty(text))
        {
            return String.Empty;
        }
    
        // Uses SHA256 to create the hash
        using (var sha = new System.Security.Cryptography.SHA256Managed())
        {
            // Convert the string to a byte array first, to be processed
            byte[] textBytes = System.Text.Encoding.UTF8.GetBytes(text + salt);
            byte[] hashBytes = sha.ComputeHash(textBytes);
        
            // Convert back to a string, removing the '-' that BitConverter adds
            string hash = BitConverter
                .ToString(hashBytes)
                .Replace("-", String.Empty);

            return hash;
        }
    }
}