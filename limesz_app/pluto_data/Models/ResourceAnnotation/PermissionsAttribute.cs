namespace Pluto.Models.ResourceAnnotation;

[System.AttributeUsage(System.AttributeTargets.Class | System.AttributeTargets.Property)]
public class PermissionsAttribute: Attribute
{
    List<string> Permissions { get; set; }
    
    public PermissionsAttribute(params string[] permissions)
    {
        Permissions = permissions.ToList();
    }
    
}