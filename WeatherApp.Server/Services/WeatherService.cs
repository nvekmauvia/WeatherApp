using System.Net.Http;
using System.Text.Json;
using WeatherApp.Server.Models;
using WeatherApp.Server.Models.Common;

namespace WeatherApp.Server.Services
{
	public class WeatherService : IWeatherService
	{
		private readonly HttpClient _httpClient;
		private readonly string _apiKey;

		public WeatherService(HttpClient httpClient, IConfiguration configuration)
		{
			_httpClient = httpClient;
			_apiKey = configuration["OpenWeatherApiKey"] ?? throw new ArgumentNullException(nameof(_apiKey), "Missing API Key!");
		}

		public async Task<CurrentWeather> GetCurrentWeatherAsync(string lat, string lon)
		{
			var response = await _httpClient.GetAsync($"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid={_apiKey}");
			response.EnsureSuccessStatusCode();
			var jsonString = await response.Content.ReadAsStringAsync();

			var data = JsonSerializer.Deserialize<CurrentWeather>(jsonString);
			return data ?? throw new ArgumentNullException("Current Weather data invalid!");
		}

		public async Task<WeeklyWeather> GetWeeklyWeatherAsync(string lat, string lon)
		{
			var response = await _httpClient.GetAsync($"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&units=metric&appid={_apiKey}");
			response.EnsureSuccessStatusCode();
			var jsonString = await response.Content.ReadAsStringAsync();

			var data = JsonSerializer.Deserialize<WeeklyWeather>(jsonString);
			return data ?? throw new ArgumentNullException("Weekly Weather data invalid!");
		}

		public async Task<Location> GetLocationAsync(int postcode)
		{
			var response = await _httpClient.GetAsync($"https://api.openweathermap.org/geo/1.0/zip?zip={postcode},AU&appid={_apiKey}");
			response.EnsureSuccessStatusCode();
			var jsonString = await response.Content.ReadAsStringAsync();

			var data = JsonSerializer.Deserialize<Location>(jsonString);
			return data ?? throw new ArgumentNullException("Location data invalid!");
		}
	}
}