using MongoDB.Driver;
using Pluto.Models.AccessControl;
using pluto.PlutoRepo;
using pluto.Services.Database;

namespace pluto.Services.Roles;

public class RolesResource: PlutoSmartRepo<Role>
{
    public static RolesResource Instance { get; set; }
    public RolesResource(IMongoDatabaseService mongoDatabaseService) : base(mongoDatabaseService, "Role")
    {
        Instance = this;
    }

    public List<Role> GetMany(IEnumerable<string> roleIds)
    {
        return this._collection.Find(r => roleIds.Contains(r.Id)).ToList();
    }
}