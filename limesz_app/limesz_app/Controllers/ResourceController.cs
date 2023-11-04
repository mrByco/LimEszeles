using System.Reflection;
using margarita_app.Services;
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
    public async Task<PaginatedResourceResult> GetResourcesPaginated(string resourceType, int page, int pageSize)
    {
        Type baseType = typeof(BaseDataResourceService<>);
        Type[] types = Assembly.GetAssembly(baseType).GetTypes();

        var service =
            _services.GetService(types.FirstOrDefault(t =>
                t.Name == resourceType && t.BaseType?.Name == baseType.Name) ?? throw new InvalidOperationException());
        
        
        var method = service.GetType().GetMethod("GetPaginatedResource");
        var result = (PaginatedResourceResult) method?.Invoke(service, new object[] {page, pageSize});
        
        return result;
    }
    
    [HttpGet("get-resource/{resourceType}/{id}", Name = nameof(GetResource))]
    public object GetResource(string resourceType, string id)
    {
        var result = CallCorrespondingServiceMethod(resourceType, new object[] { id });
        return result;
    }

    private object? CallCorrespondingServiceMethod(string resourceType, object[] args)
    {
        Type baseType = typeof(BaseDataResourceService<>);
        Type[] types = Assembly.GetAssembly(baseType).GetTypes();

        var service =
            _services.GetService(types.FirstOrDefault(t =>
                t.Name == resourceType && t.BaseType?.Name == baseType.Name) ?? throw new InvalidOperationException());


        var method = service.GetType().GetMethod("GetByIdResource");
        var result = method?.Invoke(service, args);
        return result;
    }

    [HttpPost("create-resource/{resourceType}", Name = nameof(CreateResource))]
    public object CreateResource(string resourceType, object model)
    {
        Type baseType = typeof(BaseDataResourceService<>);
        Type[] types = Assembly.GetAssembly(baseType).GetTypes();

        var service =
            _services.GetService(types.FirstOrDefault(t =>
                t.Name == resourceType && t.BaseType?.Name == baseType.Name) ?? throw new InvalidOperationException());
        
        
        var method = service.GetType().GetMethod("CreateResource");
        var result = method?.Invoke(service, new object[] {model});
        
        return result;
    }
    
    
    /*
    public Task<List<CardSet>> Get()
    {
        return null;
    }

    public Task<CardSet> GetById(int id)
    {
        return null;
    }

    public Task<CardSet> Post(object value)
    {
        throw new NotImplementedException();
    }

    public Task<CardSet> Put(int id, object value)
    {
        throw new NotImplementedException();
    }

    public Task<CardSet> Delete(int id)
    {
        throw new NotImplementedException();
    }*/
}