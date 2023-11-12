using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Pluto.Models
{
	public class BaseRootModel
	{
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
	}
}

