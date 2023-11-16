using Pluto.Models.AccessControl;

namespace pluto.Services.Roles;

public class MockRolesResource : IRolesResource
{
    public List<Role> RolesInsideCollection { get; set; } = new List<Role>();
    
    public List<Role> GetMany(IEnumerable<string> roleIds)
    {
        return this.RolesInsideCollection.Where(r => roleIds.Contains(r.Id)).ToList();
    }
}