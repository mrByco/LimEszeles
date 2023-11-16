namespace Pluto.Models.ResourceAnnotation;

[AttributeUsage(System.AttributeTargets.Class)]
public class StandaloneResourceAttribute: Attribute
{
    public string CollectionName { get; }
    
    public StandaloneResourceAttribute(string collectionName)
    {
        CollectionName = collectionName;
    }
}