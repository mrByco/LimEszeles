namespace Pluto.Models.ResourceAnnotation;

[System.AttributeUsage(System.AttributeTargets.Property)]
public class ForeignKeyAttribute: Attribute
{
    public Type ForeignResourceType { get; set; }
    public ForeignKeyAttribute(Type foreignResourceType)
    {
        ForeignResourceType = foreignResourceType;
    }
}