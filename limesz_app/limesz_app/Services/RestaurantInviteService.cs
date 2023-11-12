using margarita_data.Models;
using pluto.PlutoRepo.Implementations;
using pluto.Services.Database;

namespace limesz_app.Services
{
    public class RestaurantInviteService : MongoBaseRepositoryImpl<RestaurantInvite>
    {
        protected override string CollectionName => "RestaurantInvites";

        public RestaurantInviteService(IMongoDatabaseService mongoDatabaseService) : base(mongoDatabaseService)
        {
        }


    }
}

