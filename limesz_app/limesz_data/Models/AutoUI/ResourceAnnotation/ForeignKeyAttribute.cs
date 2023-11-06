namespace margarita_data.Models.AutoUI.ResourceAnnotation;

[System.AttributeUsage(System.AttributeTargets.Property)]
public class ForeignKeyAttribute: Attribute
{
    public Type ForeignResourceName { get; set; }
    public ForeignKeyAttribute(Type foreignResourceName)
    {
        ForeignResourceName = foreignResourceName;
    }
}