using System.Collections;
using System.Net;
using System.Reflection;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using Pluto;
using pluto.Misc;
using Pluto.Models;
using Pluto.Models.AccessControl;
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
    
    [HttpGet("data-contexts", Name = nameof(GetAvailableDataContexts))]
    public List<GenericObject> GetAvailableDataContexts()
    {
        // TODO test it
        var dataContexts = new List<GenericObject>();
        var roleSpaces = RoleSpace.AllRoleSpaces;
        var user = this.GetUser();
        if (user == null) throw new System.Web.Http.HttpResponseException(HttpStatusCode.Unauthorized);
        var userRoleSpaces = user.Roles.Select(r => r.RoleSpaceKind).Distinct();
        
        user.Roles.ForEach(r =>
        {
            var roleSpace = roleSpaces.FirstOrDefault(rs => rs.RoleSpaceKind == r.RoleSpaceKind);
            if (roleSpace != null)
            {
                if (roleSpace.RoleSpaceType == null && roleSpace.RoleSpaceKind == RoleSpace.System.RoleSpaceKind)
                {
                    // Its system rolepsace
                    dataContexts.Add(new GenericObject()
                    {
                        Id = r.RoleSpaceKind,
                        Name = roleSpace.RoleSpaceDisplayName,
                        Type = r.RoleSpaceKind,
                    });
                    return;
                }
                if (roleSpace.RoleSpaceType == null)
                {
                    return;
                }

                if (r.Subject != null && dataContexts.TrueForAll(d => d.Id != r.Subject))
                {
                    GenericObject obj = this.GetGenericObjectById(roleSpace.RoleSpaceType.Name, r.Subject);
                    dataContexts.Add(obj);
                }
                else
                {
                    var objects = this.GetAllByTypeName(roleSpace.RoleSpaceType.Name);
                    dataContexts.AddRange(objects);
                }
            }
        });
        
        dataContexts = dataContexts.DistinctBy(d => d.Id).ToList();

        return dataContexts;
    }

    private GenericObject GetGenericObjectById(string objectType, string id)
    {
        var value = CallCorrespondingServiceMethod("Get", objectType, new object[] { id });
        return new GenericObject()
        {
            Id = id,
            Name = value?.ToString(),
            Type = objectType
        };
    }

    private List<GenericObject> GetAllByTypeName(string objectType)
    {
        IEnumerable<object> values = (IEnumerable<object>)CallCorrespondingServiceMethod("Get", objectType, new object[] { });
        return values.Select(v => new GenericObject()
        {
            Id = v.GetType().GetProperty("Id").GetValue(v).ToString(),
            Name = v.ToString(),
            Type = objectType
        }).ToList();
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
            .FirstOrDefault(t => 
                (t.Name == resourceType 
                 || (t.IsGenericType 
                     && t.GenericTypeArguments.Length > 0 
                     && t.GenericTypeArguments[0].Name == resourceType)) 
                && t.BaseType?.Name == typeof(PlutoSmartRepo<>).Name);
        
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