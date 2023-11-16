using System.Diagnostics.CodeAnalysis;
using MongoDB.Bson.Serialization.Attributes;
using Pluto.Models;
using Pluto.Models.ResourceAnnotation;
using Nullable = System.Nullable;

namespace margarita_data.Models.CarExample;

[BsonIgnoreExtraElements]
[StringRepresentation(nameof(FullCarName))]
public class CarModel: BaseRootModel
{
    public string? FullCarName => $"{Manufacturer}: {CarName}";
    [CanSetNull]
    public string? Manufacturer { get; set; }
    [CanSetNull]
    public string CarName { get; set; }
    [CanSetNull]
    public Engine Engine { get; set; } = new Engine();
    [CanSetNull]
    public List<Light> Lights { get; set; } = new List<Light>();
    [CanSetNull]

    public List<List<string>> ListInList { get; set; } = new List<List<string>>();
}

[StringRepresentation(nameof(EngineName))]
public class Engine
{
    [CanSetNull]
    public string EngineName { get; set; }
    [CanSetNull]
    public int EnginePower { get; set; }
}

[StringRepresentation(nameof(FullName))]
public class Light
{
    public string FullName => $"{Manufacturer}: {LightName}";
    public string Manufacturer { get; set; }
    public string LightName { get; set; }
    [CanSetNull]
    public int LightPower { get; set; }
    public string LightColor { get; set; }
}