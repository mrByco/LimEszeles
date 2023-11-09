namespace Pluto.Models.AccessControl;

public class UserRoles
{
    List<UserRolesItem> Roles { get; set; } = new List<UserRolesItem>();
}

public class UserRolesItem
{
    public string RoleSpaceKind { get; set; }
    public string RoleSpaceObjectId { get; set; }
    public List<string> Roles { get; set; } = new List<string>();
}