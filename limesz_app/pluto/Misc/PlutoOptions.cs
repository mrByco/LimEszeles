using margarita_app.Services;

namespace margarita_app.Misc;

public class PlutoOptions
{
    private readonly WebApplicationBuilder _builder;
    
    public PlutoOptions(WebApplicationBuilder builder)
    {
        _builder = builder;
    }
    
    public PlutoOptions UseUserService<T>(T type) where T: IUserService
    {
        _builder.Services.AddSingleton<IUserService>(type);
        return this;
    }
}