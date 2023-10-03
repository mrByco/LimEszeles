// See https://aka.ms/new-console-template for more information
using System.Xml.Linq;
using margarita_data;
using margarita_data.Models;
using Microsoft.Extensions.Configuration;

public class Program
{
    private static void Main(string[] args)
    {

        IConfiguration config = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json")
            .Build();

    }
}