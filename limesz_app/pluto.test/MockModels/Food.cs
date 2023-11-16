using Pluto.Models;
using Pluto.Models.ResourceAnnotation;
using pluto.test.AccessControl;

namespace pluto.test.MockModels;

[Permissions(MockPermissions.TestFoo1, MockPermissions.Write)]
public class Food: BaseRootModel
{
    public string Name { get; set; }
    public string Description { get; set; }
    [ForeignKey(typeof(Restaurant))]
    public string Restaurant { get; set; }
    public List<string> Allergens { get; set; }
}