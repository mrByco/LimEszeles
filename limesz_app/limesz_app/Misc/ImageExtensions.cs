using Newtonsoft.Json.Linq;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;

namespace margarita_app.Misc
{
    public static class ImageExtensions
    {
        public static void ResizeMax(this Image image, float maxHeight, float maxWidth)
        {
            var logoSizeMultiplier = Math.Min(maxHeight / image.Width, maxWidth / image.Height);
            image.Mutate(x => x.Resize((int)(logoSizeMultiplier * image.Width), (int)(logoSizeMultiplier * image.Height)));
        }
        public static void DrawImagePositioned(this Image image, Image imageToDraw, DrawPosition position)
        {
            var cloned = imageToDraw.CloneAs<Rgba32>();
            cloned.ResizeMax(position.Height, position.Width);
            image.Mutate(x => x.DrawImage(cloned, new Point((int)position.X - cloned.Width / 2, (int)position.Y - cloned.Height / 2), 1f));
        }
    }
}
