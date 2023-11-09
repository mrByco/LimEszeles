using System;
using margarita_app.Services.Database;
using margarita_data.Models;
using pluto.PlutoRepo;

namespace margarita_app.Services
{
    public class RestaurantInviteService : MongoBaseRepositoryImpl<RestaurantInvite>
    {
        protected override string CollectionName => "RestaurantInvites";

        public RestaurantInviteService(IMongoDatabaseService mongoDatabaseService) : base(mongoDatabaseService)
        {
        }


    }
}

