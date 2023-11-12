using limesz_app.Models;

namespace limesz_app.Services.PostalCodeService
{
    public interface IPostalCodeService
    {
        public PostalCodeEntry? GetPostalCodeEntry(int id);
    }
}
