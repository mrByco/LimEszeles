using System.Reflection;
using margarita_app.Services;
using margarita_data.Models;
using margarita_data.Models.AutoUI;
using Microsoft.AspNetCore.Mvc;
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
                    resourceTypes.Add(new ResourceDescription()
                    {
                        Name = type.Name,
                        Type = genericType.Name,
                        Props = GetResourceDescription(type)
                    });
                }
            }
        }

        return resourceTypes;
    }

    private List<ResourceProp> GetResourceDescription(Type type)
    {
        var props = new List<ResourceProp>();

        if (type.BaseType?.Name != typeof(BaseDataResourceService<>).Name)
        {
            return new();
        }
        
        var genericType = type.BaseType.GetGenericArguments()[0];
        var properties = genericType.GetProperties();
        foreach (var property in properties)
        {
            switch (property.PropertyType.Name)
            {
                case "String":
                    props.Add(new ResourceProp()
                    {
                        PropName = property.Name,
                        PropType = "string"
                    });
                    break;
                case "Int32":
                    props.Add(new ResourceProp()
                    {
                        PropName = property.Name,
                        PropType = "number"
                    });
                    break;
                case "Decimal":
                    props.Add(new ResourceProp()
                    {
                        PropName = property.Name,
                        PropType = "number" 
                    });
                    break;
                case "DateTime":
                    props.Add(new ResourceProp()
                    {
                        PropName = property.Name,
                        PropType = "date" 
                    });
                    break;
                case "Boolean":
                    props.Add(new ResourceProp()
                    {
                        PropName = property.Name,
                        PropType = "boolean"
                    });
                    break;
                // Add more cases for other common property types as needed
                default:
                    props.Add(new ResourceProp()
                    {
                        PropName = property.Name,
                        PropType = "unknown" // Or handle it in a way suitable for your use case
                    });
                    break;
            }
        }
        return props;
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
    
    [HttpGet("update-resource/{resourceType}/{id}", Name = nameof(UpdateResource))]
    public BaseRootModel UpdateResource(string resourceType, string id, object model)
    {
        return (BaseRootModel)
            CallCorrespondingServiceMethod("UpdateResource", resourceType, new object[] { id, model })!;
    }
    
    [HttpDelete("remove-resource/{resourceType}/{id}", Name = nameof(RemoveResource))]
    public void RemoveResource(string resourceType, string id)
    {
        CallCorrespondingServiceMethod("RemoveResource", resourceType, new object[] { id });
    }

    private object? CallCorrespondingServiceMethod(string methodName, string resourceType, object[] args)
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
}