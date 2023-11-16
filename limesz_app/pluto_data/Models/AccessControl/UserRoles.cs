namespace Pluto.Models.AccessControl;


public class RolesItem
{
    public string RoleSpaceKind { get; set; } = RoleSpace.System.RoleSpaceKind;
    public string? Subject { get; set; }
    public List<string> Roles { get; set; } = new List<string>();
}