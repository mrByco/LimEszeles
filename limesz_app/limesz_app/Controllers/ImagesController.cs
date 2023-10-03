using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;
using margarita_app.Misc;
using margarita_app.Models.Blob;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Microsoft.Win32.SafeHandles;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace margarita_app.Controllers
{
    [Route("[controller]")]
    public class ImagesController : Controller
    {

        private readonly IWebHostEnvironment _environment;
        private readonly IAzureStorage _storage;
        private readonly List<string> enabledFileSizes = new List<string>() { "150", "300", "800" };

        public ImagesController(IWebHostEnvironment environment, IAzureStorage storage)
        {
            _environment = environment;
            _storage = storage;
        }

        [Route("{fullFilename?}")]
        [HttpGet]
        public async Task<IActionResult> GetAsync(string fullFilename)
        {
            string filename = fullFilename.Split(".")[0];
            string extension = fullFilename.Split(".")[1];

            string imageId = filename.Split('_')[0];
            string? size = filename.Split('_').Length > 1 ? filename.Split('_')[1] : null;

            if (size != null && !enabledFileSizes.Contains(size)) return new NotFoundResult();


            string path = Path.Combine(_environment.ContentRootPath, "Images", fullFilename);

            if (!System.IO.File.Exists(path))
            {
                BlobDto? blob = await _storage.DownloadAsync(imageId + "." + extension);

                if (blob == null)
                {
                    Byte[] b = System.IO.File.ReadAllBytes(Path.Combine(_environment.ContentRootPath, "wwwroot", "images", "default.jpeg"));
                    return File(b, "image/jpeg");
                }

                FileStream writeStream = new FileStream(path, FileMode.Create);

                if (size != null)
                {
                    using SixLabors.ImageSharp.Image sourceImage = SixLabors.ImageSharp.Image.Load(blob.Content!);
                    sourceImage.Mutate(x => x.Resize(int.Parse(size), (int)(sourceImage.Height / (int)(sourceImage.Width * int.Parse(size)))));
                    sourceImage.SaveAsJpeg(writeStream);
                }
                else
                {
                    blob.Content!.CopyTo(writeStream);
                }

                writeStream.Close();
                blob.Content.Close();
            }

            try
            {
                Byte[] b = System.IO.File.ReadAllBytes(path);
                return File(b, "image/jpeg");
            }
            catch (IOException e)
            {
                Byte[] b = System.IO.File.ReadAllBytes(Path.Combine(_environment.ContentRootPath, "wwwroot", "images", "default.jpeg"));
                return File(b, "image/jpeg");
            }
        }
    }
}

