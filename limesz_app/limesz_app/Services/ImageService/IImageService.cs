using System;
using System.Linq.Expressions;

namespace margarita_app.Services.ImageService
{
    public interface IImageService
    {
        Task<string> UploadImage(byte[] file, string format = "jpeg", string? customId = null);
        Task ReplaceImageOn<T>(T entity, Expression<Func<T, string?>> imagePropertyPath, byte[] file, string format = "jpeg");
        Task RemoveImage(string name);
        Task<Stream> GetImage(string imageId);
        byte[] GetResourceImage(string filename);
    }
}

