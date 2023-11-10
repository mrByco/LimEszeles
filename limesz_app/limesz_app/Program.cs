using System.Reflection;
using margarita_app.Hubs;
using margarita_app.Misc;
using margarita_app.Services;
using margarita_app.Services.EmailService;
using margarita_app.Services.ImageService;
using margarita_app.Services.PostalCodeService;

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

builder.Services.AddTransient<IAzureStorage, AzureStorage>();



builder.Services.AddScoped<IImageService, ImageService>();

builder.Services.AddSingleton<RestaurantInviteService>();
builder.Services.AddSingleton<IPostalCodeService, PostalCodeService>();
builder.Services.AddSingleton<EmailService>();
builder.Services.AddSingleton<DocumentFileService>();
builder.Services.AddSingleton<ConnectionService>();
builder.Services.AddSingleton<GameService>();
builder.Services.AddSingleton<CardSetService>();
builder.Services.AddSingleton<NestedTestService>();
builder.Services.AddSingleton<ManufacturedCarService>();

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
