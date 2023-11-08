using System.Reflection;
using margarita_app.Services.Database;

namespace margarita_app.Misc;

public static class WebApplicationBuilderExtensions
{
    public static void ConfigurePluto(this WebApplicationBuilder builder, Assembly bindingAssembly)
    {
        PlutoConfig.BindingAssembly = bindingAssembly;
        var services = builder.Services;
        
        PlutoConfig.Instance = builder.Configuration.Get<PlutoConfig>();
        
        #if TEST
            services.AddSingleton<IDatabaseService, FakeDatabaseService>();
        #else
            services.AddSingleton<IDatabaseService, DatabaseService>();
        #endif
        
        
        var assembly = typeof(IDatabaseService).Assembly;
        services.AddControllers()
            .AddApplicationPart(assembly);
    }
}