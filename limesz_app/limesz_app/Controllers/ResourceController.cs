using System.Reflection;
using Google.Rpc.Context;
using margarita_app.Services;
using margarita_data.Models;
using margarita_data.Models.AutoUI;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver.Core.Operations;
using Type = System.Type;

namespace margarita_app.Controllers;

[Route("[controller]")]
[ApiController]
public class ResourceController: ControllerBase
{
    private readonly IServiceProvider _services;
    
    public ResourceController(IServiceProvider services)
    {
        _services = services;
    }

    [HttpGet("get-resource-list", Name = nameof(GetResourceTypes))]
    public List<ResourceDescription> GetResourceTypes()
    {
        Type baseType = typeof(BaseDataResourceService<>);
        Type[] types = Assembly.GetAssembly(baseType).GetTypes();
        List<ResourceDescription> resourceTypes = new List<ResourceDescription>();
        foreach (var type in types)
        {
            var t = type.BaseType?.Name == baseType.Name;
            if (type.BaseType != null && type.BaseType.IsGenericType && t)
            {
                Type genericType = type.BaseType.GetGenericArguments().FirstOrDefault();

                if (genericType != null)
                {
                    if (type.BaseType?.Name != typeof(BaseDataResourceService<>).Name)
                    {
                        return new();
                    }
                    resourceTypes.Add(new ResourceDescription()
                    {
                        Name = type.Name,
                        Type = genericType.Name,
                        Props = GetPropertyListOfType(genericType)
                    });
                }
            }
        }

        return resourceTypes;
    }

    private List<ResourceProp> GetPropertyListOfType(Type type)
    {
        var props = new List<ResourceProp>();
        var properties = type.GetProperties();
        
        foreach (var property in properties)
        {
            props.Add(GetPropertyDefinition(property.Name, property.PropertyType));
        }
        return props;
    }

    private ResourceProp GetPropertyDefinition(string name, Type propertyType)
    {
        var prop = new ResourceProp()
        {
            PropName = name,
            PropType = GetAtomicPropertyType(propertyType)
        };
        
        if (prop.PropType == "list")
        {
            var genericType = propertyType.GetGenericArguments()[0];
            if (isPrimitiveType(genericType))
            {
                prop.EmbededTypeDefinition = GetAtomicPropertyType(genericType);
            }
            else
            {
                prop.EmbededTypeDefinition = GetPropertyListOfType(genericType);
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
        var atomic = GetAtomicPropertyType(type);
        if (atomic == "object" || atomic == "list" || atomic == "enum")
            return false;
        return true;
    }
    
    static string GetAtomicPropertyType(Type type)
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
    
    


    [HttpGet("get-resources-paginated/{resourceType}/{page}/{pageSize}", Name = nameof(GetResourcesPaginated))]
    public PaginatedResourceResult GetResourcesPaginated(string resourceType, int page, int pageSize)
    {
        return (PaginatedResourceResult)
            CallCorrespondingServiceMethod("GetPaginatedResource", resourceType,new object[] { page, pageSize })!;
    }
    
    [HttpGet("get-resource/{resourceType}/{id}", Name = nameof(GetResource))]
    public BaseRootModel GetResource(string resourceType, string id)
    {
        return (BaseRootModel) 
            CallCorrespondingServiceMethod("GetByIdResource", resourceType, new object[] { id })!;
    }

    [HttpGet("create-resource/{resourceType}", Name = nameof(CreateResource))]
    public BaseRootModel CreateResource(string resourceType)
    {
        return (BaseRootModel)
            CallCorrespondingServiceMethod("CreateResource", resourceType, new object[] {  })!;
    }
    
    [HttpPost("update-resource/{resourceType}/{id}", Name = nameof(UpdateResource))]
    public BaseRootModel UpdateResource(string resourceType, string id, List<FieldChange> requests)
    {
        return (BaseRootModel)
            CallCorrespondingServiceMethod("UpdateResource", resourceType, new object[] { id, requests })!;
    }
    
    [HttpDelete("remove-resource/{resourceType}/{id}", Name = nameof(RemoveResource))]
    public void RemoveResource(string resourceType, string id)
    {
        CallCorrespondingServiceMethod("RemoveResource", resourceType, new object[] { id });
    }

    private object? CallCorrespondingServiceMethod(string methodName, string resourceType, object[] args)
    {
        try
        {
            Type baseType = typeof(BaseDataResourceService<>);
            Type[] types = Assembly.GetAssembly(baseType).GetTypes();

            var service =
                _services.GetService(types.FirstOrDefault(t =>
                    t.Name == resourceType && t.BaseType?.Name == baseType.Name) ?? throw new InvalidOperationException());

            var method = service.GetType().GetMethod(methodName);
            var result = method?.Invoke(service, args);
            return result;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}