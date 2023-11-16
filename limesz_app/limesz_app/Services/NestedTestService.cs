using margarita_data.Models.CarExample;
using pluto.PlutoRepo;
using pluto.Services.Database;

namespace limesz_app.Services;

public class NestedTestService: PlutoSmartRepo<CarModel>
{
    public NestedTestService(IMongoDatabaseService mongoDatabaseService) : base(mongoDatabaseService, "NestedTest1")
    {
    }
}