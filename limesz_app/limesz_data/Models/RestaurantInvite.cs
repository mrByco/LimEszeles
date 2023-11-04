using System;
using MongoDB.Bson.Serialization.Attributes;

namespace margarita_data.Models
{
    [BsonIgnoreExtraElements]
    public class RestaurantInvite: BaseRootModel
	{
        public string InviteGuid { get; set; }
        public string UserEmail { get; set; }
        public string RestaurantId { get; set; }
        public List<string> RolesToAddOnInvite { get; set; }
        public DateTime Created { get; set; }
        
        public DateTime KevinGN { get; set; }
        public bool THBeforeGN { get; set; }
    }
}

