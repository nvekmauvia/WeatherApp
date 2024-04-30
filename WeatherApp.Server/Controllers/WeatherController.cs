using Microsoft.AspNetCore.Mvc;
using WeatherApp.Server.Models;
using WeatherApp.Server.Services;

namespace WeatherApp.Server.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class WeatherController : ControllerBase
	{
		private readonly IWeatherService _weatherService;
		public WeatherController(IWeatherService weatherService)
		{
			_weatherService = weatherService;
		}

		[HttpGet("location/{postcode}")]
		public async Task<ActionResult<Location>> GetLocation(int postcode)
		{
			try
			{
				var location = await _weatherService.GetLocationAsync(postcode);
				return Ok(location);
			}
			catch (HttpRequestException e)
			{
				return BadRequest("Errors fetching location: " + e.Message);
			}
		}

		[HttpGet("current/{lat}/{lon}")]
		public async Task<ActionResult<CurrentWeather>> GetCurrentWeather(double lat, double lon)
		{
			try
			{
				var weather = await _weatherService.GetCurrentWeatherAsync(lat.ToString(), lon.ToString());
				return Ok(weather);
			}
			catch (HttpRequestException e)
			{
				return BadRequest("Errors fetching current weather: " + e.Message);
			}
		}

		[HttpGet("weekly/{lat}/{lon}")]
		public async Task<ActionResult<WeeklyWeather>> GetWeeklyWeather(double lat, double lon)
		{
			try
			{
				var weather = await _weatherService.GetWeeklyWeatherAsync(lat.ToString(), lon.ToString());
				return Ok(weather);
			}
			catch (HttpRequestException e)
			{
				return BadRequest("Error fetching weekly weather: " + e.Message);
			}
		}
	}
}