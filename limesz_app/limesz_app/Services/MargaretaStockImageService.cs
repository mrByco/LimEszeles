using System;
using margarita_app.Misc;
using margarita_app.Services.Database;
using margarita_app.Services.ImageService;
using margarita_data.Models;
using MongoDB.Driver;
using SixLabors.ImageSharp;

namespace margarita_app.Services
{
    public class MargaretaStockImageService : BaseDataResourceService<MargaretaStockImage>
    {
        private readonly IImageService _imageService;

        public MargaretaStockImageService(IDatabaseService databaseService, IImageService imageService) : base(databaseService)
        {
            _imageService = imageService;
        }

        protected override string CollectionName => "StockImages";

        public void RemoveStockImage(string id)
        {
            MargaretaStockImage? margaretaStockImage = Get(id);
            try
            {
                _imageService.RemoveImage(margaretaStockImage!.ImageId);    
            }
            catch(Exception e)
            {
                System.Console.WriteLine("ERROR: COULD NOT DELETE STOCK IMAGE:" + id);
            }
            Remove(id);
        }

        public List<MargaretaStockImage> GetStockImages(int page, int size)
        {
            return _collection.Find(_ => true).SortByDescending(image => image.Id).Skip(page * size).Limit(size).ToList();
        }

        public async Task<MargaretaStockImage> AddNewImage(string name, byte[] file)
        {
            Image img = Image.Load(file);
            img.ResizeMax(2048, 2048);
            MemoryStream outputStream = new MemoryStream();
            img.SaveAsJpeg(outputStream);
            var imageId = "stock-" + Guid.NewGuid().ToString();
            var uploadedImage = await _imageService.UploadImage(outputStream.ToArray(), "jpeg", imageId);
            var created = Create(new MargaretaStockImage() { OriginalName = name, ImageId = uploadedImage, Created = UTCNow.GetNow });
            return created;
        }
    }
}

