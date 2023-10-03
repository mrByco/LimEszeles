using System;
namespace margarita_app.Models
{
	public class ConversationDto
	{
		public List<ChatDto> Chats { get; set; }
		public Dictionary<string, string> FoodIndexToIdMap { get; set; }
		public int TokensUsed { get; set; } = 0;
	}
}

