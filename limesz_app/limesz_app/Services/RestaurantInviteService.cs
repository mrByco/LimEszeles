using System;
using margarita_app.Services.Database;
using margarita_data.Models;

namespace margarita_app.Services
{
    public class RestaurantInviteService : BaseDataService<RestaurantInvite>
    {
        protected override string CollectionName => "RestaurantInvites";

        public RestaurantInviteService(IDatabaseService databaseService) : base(databaseService)
        {
        }


    }
}

