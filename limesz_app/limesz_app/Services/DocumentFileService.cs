using margarita_app.Misc;
using margarita_app.Models.Blob;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using System.Reflection.Metadata;

namespace margarita_app.Services
{
    public class DocumentFileService
    {
        private readonly IAzureStorage _storage;
        private readonly string containerName = "documents";
        public DocumentFileService(IAzureStorage storage)
        {
            _storage = storage;
        }
        
        public async Task<BlobDto> GetFile(string fileName)
        {
            var file = await _storage.DownloadAsync($"{containerName}/{fileName}");
            return file;
        }

        public async Task<BlobResponseDto> UploadFile(IFormFile file, string filename)
        {
            byte[] bytes = new byte[file.Length];
            file.OpenReadStream().Read(bytes);
            var fileUrl = await _storage.UploadAsync(bytes, $"{containerName}/{filename}");
            return fileUrl;
        }

        public async Task<BlobResponseDto> UploadFile(Stream file, string filename)
        {
            var fileUrl = await _storage.UploadAsync(file, $"{containerName}/{filename}");
            return fileUrl;
        }

        public async Task<BlobResponseDto> OverrideFile(IFormFile file, string filename)
        {
            byte[] bytes = new byte[file.Length];
            file.OpenReadStream().Read(bytes);
            var fileUrl = await _storage.UploadAsync(bytes, $"{containerName}/{filename}");
            return fileUrl;
        }
        public async Task DeleteFile(string restaurantId)
        {
            var fileName = $"{restaurantId}.pdf";
            await _storage.DeleteAsync($"{containerName}/{fileName}");
        }


    }
}
