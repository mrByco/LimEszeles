using System.Reflection;
using pluto.Misc;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.ConfigurePluto();

var app = builder.Build();

app.UsePluto();
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();