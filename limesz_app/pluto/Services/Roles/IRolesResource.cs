using Pluto.Models.AccessControl;

namespace pluto.Services.Roles;

public interface IRolesResource
{
    List<Role> GetMany(IEnumerable<string> roleIds);
}