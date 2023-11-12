using System.Linq.Expressions;
using System.Reflection;
using limesz_app.Misc;

namespace limesz_app.Services.ImageService
{
    public class ImageService : IImageService
    {
        private readonly string _ImagesFolderPath;
        private readonly string _ResourceFolderPath;
        private readonly IAzureStorage _storage;

        public ImageService(IWebHostEnvironment environment, IAzureStorage storage)
        {
            _ImagesFolderPath = Path.Combine(environment.ContentRootPath, "Images");
            _ResourceFolderPath = Path.Combine(environment.ContentRootPath, "wwwroot");
            _storage = storage;
            EnsureImagesFolderCreated();
        }

        public async Task<string> UploadImage(byte[] file, string format = "jpeg", string? customId = null)
        {
            EnsureImagesFolderCreated();
            if (file.Length > 10000000)
            {
                throw new Exception("File limit exceeded");
            }

            string filename = (customId ?? Guid.NewGuid().ToString()) + $".{format}";
            var fullPath = Path.Combine(_ImagesFolderPath, filename);

            await OverrideFile(file, fullPath);
#if !TEST
            await _storage.UploadAsync(file, filename);
#endif
            return filename;
        }

        private static async Task OverrideFile(byte[] file, string path)
        {
            if (File.Exists(path))
                File.Delete(path);
            using (var writeStream = new FileStream(path, FileMode.Create))
            {
                writeStream.Write(file);
            }
        }

        private void EnsureImagesFolderCreated()
        {
            if (!Directory.Exists(_ImagesFolderPath))
                Directory.CreateDirectory(_ImagesFolderPath);
        }

        public async Task RemoveImage(string name)
        {
            var path = Path.Combine(_ImagesFolderPath, name);
            if (File.Exists(path))
                File.Delete(path);

#if !TEST
            await _storage.DeleteAsync(name);
#endif
        }

        public async Task ReplaceImageOn<T>(T entity, Expression<Func<T, string?>> imagePropertyPath, byte[] file, string format = "jpeg")
        {

            var imagePropSelectorExpression = imagePropertyPath.Body as MemberExpression;
            if (imagePropSelectorExpression == null)
            {
                throw new Exception("imagePropertyPath must be a property selector expression");
            }
            var prop = imagePropSelectorExpression.Member as PropertyInfo;
            if (prop!.GetValue(entity) != null)
            {
                await RemoveImage((string)prop.GetValue(entity)!);
            }
            var imageId = await UploadImage(file, format);
            prop.SetValue(entity, imageId);
        }

        public async Task<Stream> GetImage(string imageId)
        {
            var path = Path.Combine(_ImagesFolderPath, imageId);
            var blob = await _storage.DownloadAsync(imageId);
            return blob.Content;
        }

        public byte[] GetResourceImage(string filename)
        {
            var fullPath = Path.Combine(_ResourceFolderPath, filename);
            var file = File.ReadAllBytes(fullPath);
            return file;
        }
    }
}

