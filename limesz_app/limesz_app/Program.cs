using limesz_app.Hubs;
using limesz_app.Misc;
using limesz_app.Services;
using limesz_app.Services.Game;
using limesz_app.Services.ImageService;
using pluto.Misc;
using Pluto.Models;
using Pluto.Models.AccessControl;
using pluto.Services.EmailService;
using pluto.Services.User;

var builder = WebApplication.CreateBuilder(args);


Config.Instance = builder.Configuration.Get<Config>();

// Add services to the container.

builder.Services.AddControllersWithViews();

/*#if TEST
builder.Services.AddSingleton<IDatabaseService, FakeDatabaseService>();
#else
builder.Services.AddSingleton<IDatabaseService, DatabaseService>();
#endif*/

builder.ConfigurePluto();
RoleSpace.CustomRoleSpaces = new List<RoleSpace>()
{
    RoleSpace.For<User>("user")
};

builder.Services.AddTransient<IAzureStorage, AzureStorage>();


builder.Services.AddScoped<IImageService, ImageService>();

builder.Services.AddSingleton<EmailService>();
builder.Services.AddSingleton<ConnectionService>();
builder.Services.AddSingleton<GameService>();
builder.Services.AddSingleton<CardSetService>();


//TODO

builder.Services.AddSignalR();


var app = builder.Build();


// INIT user servie singleton
app.Services.GetService<UserService>();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
    app.UseHttpsRedirection();
}

//app.UseStaticFiles();
app.UseRouting();

app.UsePluto();

app.UseCors(builder =>
{
    builder.WithOrigins("http://localhost:7156", "http://localhost:4200", "https://limesz.cookta.me")
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
});


app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapHub<RideHub>("/ridehub");
});


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.Run();
