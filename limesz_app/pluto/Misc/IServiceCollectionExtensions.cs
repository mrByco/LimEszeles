using System.Reflection;
using System.Runtime.CompilerServices;
using System.Text;
using margarita_app.Services;
using margarita_app.Services.Database;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace margarita_app.Misc;

public static class WebApplicationBuilderExtensions
{
    public static void ConfigurePluto(this WebApplicationBuilder builder)
    {
        PlutoConfig.BindingAssembly = Assembly.GetEntryAssembly();
        var services = builder.Services;

        PlutoConfig.Instance = builder.Configuration.Get<PlutoConfig>();

        #if TEST
            services.AddSingleton<IDatabaseService, FakeDatabaseService>();
        #else
            services.AddSingleton<IMongoDatabaseService, MongoDatabaseService>();
        #endif

        //TODO make user service replaceable
        services.AddSingleton<IUserService, UserService>();

        var assembly = typeof(IMongoDatabaseService).Assembly;
        services.AddControllers()
            .AddApplicationPart(assembly);


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

        CheckJwtConfiguration(builder);


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
    }

    private static void CheckJwtConfiguration(WebApplicationBuilder builder)
    {
        EnsureAllConfigurationsExist(builder.Configuration,
            ("Jwt:Key", "JWT key is missing or not configured in appsettings.json under Jwt:Key"),
            ("Jwt:Issuer", "JWT issuer is missing or not configured in appsettings.json under Jwt:Issuer"),
            ("Jwt:Audience", "JWT audience is missing or not configured in appsettings.json under Jwt:Audience"));
    }

    private static void EnsureAllConfigurationsExist(IConfiguration configuration, params (string Key, string ErrorMessage)[] configurations)
    {
        var missingConfigurations = configurations.Where(c => configuration[c.Key] == null).ToList();

        if (missingConfigurations.Any())
        {
            var errorMessage = "The following JWT configurations are missing or not properly configured in appsettings.json:\n";
            errorMessage += string.Join("\n", missingConfigurations.Select(c => $"- {c.ErrorMessage}"));
            throw new InvalidOperationException(errorMessage);
        }
    }
}
