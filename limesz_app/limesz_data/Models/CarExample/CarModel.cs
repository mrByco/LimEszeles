using margarita_data.Models.AutoUI.ResourceAnnotation;
using MongoDB.Bson.Serialization.Attributes;

namespace margarita_data.Models;

[BsonIgnoreExtraElements]
public class CarModel: BaseRootModel
{
    public string Manufacturer { get; set; }
    public string CarName { get; set; }
    public Engine Engine { get; set; } = new Engine();
    public List<Light> Lights { get; set; } = new List<Light>();

    public List<List<string>> ListInList { get; set; } = new List<List<string>>();
}

[StringRepresentation(nameof(EngineName))]
public class Engine
{
    public string EngineName { get; set; }
    public int EnginePower { get; set; }
}

public class Light
{
    public string Manufacturer { get; set; }
    public string LightName { get; set; }
    public int LightPower { get; set; }
    public string LightColor { get; set; }
}