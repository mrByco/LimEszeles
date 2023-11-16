using System.Reflection;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using pluto.Misc;
using Pluto.Models;
using Pluto.Models.ResourceAnnotation;
using Pluto.Models.ResourceDescription;
using pluto.PlutoRepo;
using pluto.Services.Database;
using pluto.Services.Resources;
using Type = System.Type;

namespace pluto.Controllers;

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
        var descriptions = ResourceDescriptionUtils.GetResourceDescriptions();

        return descriptions;
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
            var types = PlutoConfig.BindingAssembly
                .GetTypes()
                .Concat(Assembly.GetExecutingAssembly().GetTypes())
                .Concat(typeof(BaseRootModel).Assembly.GetTypes())
                .ToList();

            var service = GetServiceForModelType(resourceType, types);

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

    private object? GetServiceForModelType(string resourceType, List<Type> types)
    {
        Type? serviceType = types
            .FirstOrDefault(t => t.Name == resourceType && t.BaseType?.Name == typeof(PlutoSmartRepo<>).Name);
        object? service;
        if (serviceType != null)
        {
            service = _services.GetService(serviceType);
        }
        else
        {
            Type? modelType = types.FirstOrDefault(t =>
                t.Name == resourceType &&
                t.GetCustomAttribute<StandaloneResourceAttribute>() != null);
            if (modelType == null)
            {
                throw new InvalidOperationException($"No model found for type {resourceType}");
            }

            var attr = modelType.GetCustomAttribute<StandaloneResourceAttribute>();

            var args = new object[]
            {
                _services.GetService<IMongoDatabaseService>(),
                attr.CollectionName
            };
            service = Activator.CreateInstance(typeof(PlutoSmartRepo<>).MakeGenericType(modelType), args );
        }
        
        return service;
    }
}