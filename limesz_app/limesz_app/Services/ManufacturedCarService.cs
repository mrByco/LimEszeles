using margarita_app.Services.Database;
using margarita_data.Models;

namespace margarita_app.Services;

public class ManufacturedCarService: PlutoSmartRepo<ManufacturedCar>
{
    public ManufacturedCarService(IMongoDatabaseService mongoDatabaseService) : base(mongoDatabaseService)
    {
    }

    protected override string CollectionName => "ManifacturedCars";
}