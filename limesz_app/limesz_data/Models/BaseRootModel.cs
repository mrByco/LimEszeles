using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace margarita_data.Models
{
	public class BaseRootModel
	{
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
	}
}

