using margarita_app.Services.Database;
using margarita_data.Models;

namespace margarita_app.Services;

public class DeletedUserAccountsService: BaseDataService<DeletedUser>
{
    public DeletedUserAccountsService(IDatabaseService databaseService) : base(databaseService)
    {
        
    }

    protected override string CollectionName => "DeletedUsers";
}