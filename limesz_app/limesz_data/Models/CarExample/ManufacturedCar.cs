using MongoDB.Bson.Serialization.Attributes;
using Pluto.Models;
using Pluto.Models.ResourceAnnotation;

namespace margarita_data.Models.CarExample;

[BsonIgnoreExtraElements]
[StringRepresentation(nameof(Id))]
public class ManufacturedCar: BaseRootModel
{
    public DateTime ManufacturedDate { get; set; } = DateTime.Now;
    [ForeignKey(typeof(CarModel))]
    public string Model { get; set; }
}