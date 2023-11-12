namespace Pluto.Models.ResourceAnnotation;

[System.AttributeUsage(System.AttributeTargets.Class | AttributeTargets.Property)]
public class StringRepresentationAttribute : System.Attribute
{
    public string Name;
    
    public StringRepresentationAttribute(string name)
    {
        Name = name;
    }
}