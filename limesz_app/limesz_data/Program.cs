// See https://aka.ms/new-console-template for more information

using Microsoft.Extensions.Configuration;

namespace margarita_data;

public class Program
{
    private static void Main(string[] args)
    {

        IConfiguration config = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json")
            .Build();

    }
}