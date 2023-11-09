using margarita_app.Middleware;

namespace margarita_app.Misc;

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