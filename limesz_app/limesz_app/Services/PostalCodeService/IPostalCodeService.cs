using margarita_app.Models;

namespace margarita_app.Services.PostalCodeService
{
    public interface IPostalCodeService
    {
        public PostalCodeEntry? GetPostalCodeEntry(int id);
    }
}
