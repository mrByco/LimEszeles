using margarita_data.Models;

namespace Pluto.Models.AccessControl;

public class Role: BaseRootModel
{
    public string RoleSpaceKind { get; set; }
    public string RoleSpaceObjectId { get; set; }
    
    public string Name { get; set; }
    public List<string> Permissions { get; set; } = new List<string>();
}