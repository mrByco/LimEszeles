using System.Net;

namespace margarita_app.Misc
{
    public static class HttpRequestExtensions
    {
        public static byte[] GetSingleFileInBytes(this HttpRequest request)
        {
            var httpRequest = request.Form;
            if (httpRequest.Files.Count != 1)
            {
                throw new System.Web.Http.HttpResponseException(HttpStatusCode.BadRequest);
            }
            var readStream = httpRequest.Files[0].OpenReadStream();
            byte[] bytes = new byte[readStream.Length];
            readStream.Read(bytes);
            return bytes;
        }
    }
}
