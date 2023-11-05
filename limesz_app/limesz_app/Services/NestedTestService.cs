using margarita_app.Services.Database;
using margarita_data.Models;

namespace margarita_app.Services;

public class NestedTestService: BaseDataResourceService<NestedTest>
{
    public NestedTestService(IDatabaseService databaseService) : base(databaseService)
    {
    }

    protected override string CollectionName => "NestedTest1";
}