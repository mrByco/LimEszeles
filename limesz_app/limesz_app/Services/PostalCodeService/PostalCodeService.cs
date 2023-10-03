using margarita_app.Models;
using Microsoft.Extensions.Hosting;
using System;

namespace margarita_app.Services.PostalCodeService
{
    public class PostalCodeService : IPostalCodeService
    {
        private List<PostalCodeEntry> _entries;

        private readonly IWebHostEnvironment _webHostEnvironment;
        public PostalCodeService(IWebHostEnvironment environment)
        {
            this._webHostEnvironment = environment;
            loadEntries();
        }
        private void loadEntries()
        {
            _entries = new List<PostalCodeEntry>();

            IEnumerable<string> lines = System.IO.File.ReadAllLines(Path.Combine(_webHostEnvironment.ContentRootPath, "wwwroot", "postal-codes", "PostalCodeData.csv"));
            foreach (var line in lines)
            {
                var segments = line.Split(";");
                _entries.Add(new PostalCodeEntry() { Code = int.Parse(segments[0]), City = segments[1], State = segments[2] });
            }
        }
        public PostalCodeEntry? GetPostalCodeEntry(int code)
        {
            return _entries.FirstOrDefault((i) => i.Code == code);
        }
    }
}
