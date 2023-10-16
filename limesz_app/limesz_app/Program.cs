using System.Text;
using margarita_app.Hubs;
using margarita_app.Misc;
using margarita_app.Services;
using margarita_app.Services.EmailService;
using margarita_app.Services.ImageService;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using margarita_app.Services.PostalCodeService;
using margarita_app.Middleware;
using margarita_app.Services.Database;
using margarita_app.Services.LicenseService;

var builder = WebApplication.CreateBuilder(args);


Config.Instance = builder.Configuration.Get<Config>();

// Add services to the container.

builder.Services.AddControllersWithViews();

#if TEST
builder.Services.AddSingleton<IDatabaseService, FakeDatabaseService>();
#else
builder.Services.AddSingleton<IDatabaseService, DatabaseService>();
#endif

builder.Services.AddTransient<IAzureStorage, AzureStorage>();



builder.Services.AddScoped<IImageService, ImageService>();

builder.Services.AddSingleton<RestaurantInviteService>();
builder.Services.AddSingleton<UserService>();
builder.Services.AddSingleton<IPostalCodeService, PostalCodeService>();
builder.Services.AddSingleton<EmailService>();
builder.Services.AddSingleton<DocumentFileService>();
builder.Services.AddSingleton<ILicenseService, LicenseService>();
builder.Services.AddSingleton<MargaretaStockImageService>();
builder.Services.AddSingleton<DeletedUserAccountsService>();
builder.Services.AddSingleton<ConnectionService>();
builder.Services.AddSingleton<GameService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1", new OpenApiInfo { Title = "Margarita api", Version = "v1" });
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });
    option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});


builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(o =>
{
    o.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey
        (Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true
    };
});
builder.Services.AddAuthorization();

builder.Services.AddSignalR();


var app = builder.Build();


// INIT LICENSE SERVICE SINGLETON
ControllerBaseExtensions.licenseService = app.Services.GetService<ILicenseService>();
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
app.UseCors(builder =>
{
    builder.WithOrigins("http://localhost:7156", "http://localhost:4200")
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
});

app.UseSwagger();
app.UseSwaggerUI();

app.UseAuthentication();
app.UseAuthorization();
app.UseMiddleware<ErrorHandlerMiddleware>();


app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapHub<RideHub>("/ridehub");
});


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.Run();
