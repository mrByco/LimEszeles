using margarita_data.Models.CarExample;
using pluto.PlutoRepo;
using pluto.Services.Database;

namespace limesz_app.Services;

public class ManufacturedCarService: PlutoSmartRepo<ManufacturedCar>
{
    public ManufacturedCarService(IMongoDatabaseService mongoDatabaseService) : base(mongoDatabaseService)
    {
    }

    protected override string CollectionName => "ManifacturedCars";
}