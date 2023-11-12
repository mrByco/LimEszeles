using pluto.Middleware;

namespace pluto.Misc;

public static class WebApplicationExtensions
{
    public static void UsePluto(this WebApplication app)
    {
        app.UseSwagger();
        app.UseSwaggerUI(settings =>
        {
    
        });
        app.UseAuthentication();
        app.UseAuthorization();
        app.UseMiddleware<ErrorHandlerMiddleware>();
    }
}