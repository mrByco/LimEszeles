using margarita_app.Services.Database;
using margarita_data.Models;

namespace margarita_app.Services;

public class ManufacturedCarService: SmartDataService<ManufacturedCar>
{
    public ManufacturedCarService(IDatabaseService databaseService) : base(databaseService)
    {
    }

    protected override string CollectionName => "ManifacturedCars";
}