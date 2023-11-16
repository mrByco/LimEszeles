namespace Pluto.Models.AccessControl;


/// <summary>
/// RoleSpaces should be declared in role space definition classes as static readonly fields.
/// </summary>
public class RoleSpace
{
    public string RoleSpaceDisplayName { get; set; }
    public string RoleSpaceKind { get; set; }
    public Type? RoleSpaceType { get; set; }

    public List<RoleSpace> parents { get; set; }

    public static RoleSpace System { get; } = new RoleSpace
    {
        RoleSpaceDisplayName = "App",
        RoleSpaceKind = "app",
        RoleSpaceType = null
    };
    
    public static List<RoleSpace> CustomRoleSpaces { get; set; } = new List<RoleSpace>();

    public static IEnumerable<RoleSpace> AllRoleSpaces =>
        new List<RoleSpace>(CustomRoleSpaces) {System}
            .Concat(CustomRoleSpaces);

    public static RoleSpace For<T>(string kind) where T : BaseRootModel
    {
        return new RoleSpace()
        {
            RoleSpaceDisplayName = typeof(T).Name,
            RoleSpaceKind = kind,
            RoleSpaceType = typeof(T)
        };
    }

    public List<string> GetDistinctParentsKinds()
    {
        var allParents = new List<string>();
        foreach (var parent in parents)
        {
            allParents.Add(parent.RoleSpaceKind);
            allParents.AddRange(parent.GetDistinctParentsKinds());
        }
        allParents.Add(System.RoleSpaceKind);
        return allParents.Distinct().ToList();
    }
}