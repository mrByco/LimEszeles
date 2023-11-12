namespace Pluto.Models.AccessControl;


/// <summary>
/// RoleSpaces should be declared in role space definition classes as static readonly fields.
/// </summary>
public class RoleSpace
{
    public string RoleSpaceDisplayName { get; set; }
    public string RoleSpaceKind { get; set; }
    public Type? RoleSpaceType { get; set; }

    public static RoleSpace Pluto { get; } = new RoleSpace
    {
        RoleSpaceDisplayName = "App",
        RoleSpaceKind = "app",
        RoleSpaceType = null
    };

    public static RoleSpace For<T>(string kind) where T : BaseRootModel
    {
        return new RoleSpace()
        {
            RoleSpaceDisplayName = typeof(T).Name,
            RoleSpaceKind = kind,
            RoleSpaceType = typeof(T)
        };
    }
}