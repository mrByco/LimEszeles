namespace margarita_data.Models.AutoUI.ResourceAnnotation;

[System.AttributeUsage(System.AttributeTargets.Class | System.AttributeTargets.Property)]
public class ReadPermissionsAttribute: Attribute
{
    List<string> Permissions { get; set; }
    
    public ReadPermissionsAttribute(params string[] permissions)
    {
        Permissions = permissions.ToList();
    }
}