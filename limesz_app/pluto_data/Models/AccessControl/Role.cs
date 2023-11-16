using System.ComponentModel;
using Pluto.Models.ResourceAnnotation;

namespace Pluto.Models.AccessControl;

[StandaloneResource("Roles")]
public class Role: BaseRootModel
{
    public string RoleSpaceKind { get; set; }
    [Readonly]
    public string RoleSpaceSubject { get; set; }
    
    public string Name { get; set; }
    public List<string> Permissions { get; set; } = new List<string>();
}