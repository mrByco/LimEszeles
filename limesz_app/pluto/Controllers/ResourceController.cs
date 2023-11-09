using System.Reflection;
using margarita_app.Misc;
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
            Type baseType = typeof(PlutoSmartRepo<>);
            IEnumerable<Type> types = PlutoConfig.BindingAssembly.GetTypes().Concat(baseType.Assembly.GetTypes());

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