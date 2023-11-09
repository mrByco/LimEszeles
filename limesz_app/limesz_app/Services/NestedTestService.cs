using margarita_app.Services.Database;
using margarita_data.Models;

namespace margarita_app.Services;

public class NestedTestService: PlutoSmartRepo<CarModel>
{
    public NestedTestService(IMongoDatabaseService mongoDatabaseService) : base(mongoDatabaseService)
    {
    }

    protected override string CollectionName => "NestedTest1";
}