using Xunit;
using Moq;
using Moq.Protected;
using System.Net.Http;
using System.Threading.Tasks;
using System.Net;
using Microsoft.Extensions.Configuration;
using WeatherApp.Server.Services;
using System.Threading;
using Xunit.Abstractions;
using System.Text.Json;

public class WeatherServiceTests
{
	private readonly ITestOutputHelper _output;

	private readonly WeatherService _weatherService;

	public WeatherServiceTests(ITestOutputHelper output)
	{
		var configuration = new ConfigurationBuilder()
			.AddJsonFile("appsettings.Test.json")
			.Build();

		var httpClient = new HttpClient();
		
		_weatherService = new WeatherService(httpClient, configuration);

		_output = output;
	}

	[Fact]
	public async Task GetWeatherAsync_ReturnsValidCurrentWeatherData()
	{
		// Latitude and longitude for BNE
		string lat = "-27.4705";
		string lon = "153.0260";

		var result = await _weatherService.GetCurrentWeatherAsync(lat, lon);

		var jsonResult = JsonSerializer.Serialize(result, new JsonSerializerOptions { WriteIndented = true });
		_output.WriteLine("City is: " + result.Name);
		_output.WriteLine("Result: " + jsonResult);

		Assert.NotNull(result);
		Assert.True(result.Name == "Brisbane");
	}

	[Fact]
	public async Task GetWeatherAsync_ReturnsValidWeeklyWeatherData()
	{
		// Latitude and longitude for BNE
		string lat = "-27.4705";
		string lon = "153.0260";

		var result = await _weatherService.GetWeeklyWeatherAsync(lat, lon);

		var jsonResult = JsonSerializer.Serialize(result, new JsonSerializerOptions { WriteIndented = true });
		_output.WriteLine("City is: " + result.City.Name);
		_output.WriteLine("Result: " + jsonResult);

		Assert.NotNull(result);
		Assert.True(result.City.Name == "Brisbane");
	}
}
