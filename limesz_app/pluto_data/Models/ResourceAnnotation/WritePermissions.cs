namespace Pluto.Models.ResourceAnnotation;

[System.AttributeUsage(System.AttributeTargets.Class | System.AttributeTargets.Property)]
public class WritePermissions: Attribute
{
    List<string> Permissions { get; set; }
    
    public WritePermissions(params string[] permissions)
    {
        Permissions = permissions.ToList();
    }
}