using System;
namespace margarita_data.Models
{
	public class MargaretaStockImage: BaseRootModel
	{
		public string OriginalName { get; set; }
		public string ImageId { get; set; }
		public DateTime? Created { get; set; }
	}
}

