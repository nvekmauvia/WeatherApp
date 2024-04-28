using System.Threading.Tasks;
using WeatherApp.Server.Models;

namespace WeatherApp.Server.Services
{
	public interface IWeatherService
	{
		Task<CurrentWeather> GetCurrentWeatherAsync(string lat, string lon);
		Task<WeeklyWeather> GetWeeklyWeatherAsync(string lat, string lon);
		Task<Location> GetLocationAsync(int postcode);
	}
}
