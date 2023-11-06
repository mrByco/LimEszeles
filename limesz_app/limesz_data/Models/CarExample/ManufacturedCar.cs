using margarita_data.Models.AutoUI.ResourceAnnotation;
using MongoDB.Bson.Serialization.Attributes;

namespace margarita_data.Models;

[BsonIgnoreExtraElements]
[StringRepresentation(nameof(Id))]
public class ManufacturedCar: BaseRootModel
{
    public DateTime ManufacturedDate { get; set; } = DateTime.Now;
    [ForeignKey(typeof(CarModel))]
    public string Model { get; set; }
}