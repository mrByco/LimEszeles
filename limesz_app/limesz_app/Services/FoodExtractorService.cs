namespace limesz_app.Services
{
    public class FoodExtractorService
    {
        private readonly DocumentFileService documentFileService;

        public FoodExtractorService(DocumentFileService documentFileService)
        {
            this.documentFileService = documentFileService;
        }

        private async Task GetTextFromImage(string id)
        {
            
        }

        private async Task ExtractFoodsFromImage()
        {
            
        }

    }
}
