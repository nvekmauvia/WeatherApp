namespace WeatherApp.Server.Models;
using System.Text.Json.Serialization;
using WeatherApp.Server.Models.Common;

public class WeeklyWeather
{
	[JsonPropertyName("cod")]
	public string? Cod { get; set; }

	[JsonPropertyName("message")]
	public int Message { get; set; }

	[JsonPropertyName("cnt")]
	public int Cnt { get; set; }

	[JsonPropertyName("list")]
	public required List<WeeklyWeatherData> List { get; set; }

	[JsonPropertyName("city")]
	public required WeeklyWeatherCityInfo City { get; set; }
}

public class WeeklyWeatherData
{
	[JsonPropertyName("dt")]
	public long Dt { get; set; }

	[JsonPropertyName("main")]
	public required WeeklyWeatherMain Main { get; set; }

	[JsonPropertyName("weather")]
	public required List<WeatherDescription> Weather { get; set; }

	[JsonPropertyName("clouds")]
	public required Clouds Clouds { get; set; }

	[JsonPropertyName("wind")]
	public required Wind Wind { get; set; }

	[JsonPropertyName("visibility")]
	public int Visibility { get; set; }

	[JsonPropertyName("pop")]
	public double Pop { get; set; }

	[JsonPropertyName("rain")]
	public WeeklyWeatherRain? Rain { get; set; }

	[JsonPropertyName("sys")]
	public required WeeklyWeatherSys Sys { get; set; }

	[JsonPropertyName("dt_txt")]
	public string? DtTxt { get; set; }
}

public class WeeklyWeatherMain
{
	[JsonPropertyName("temp")]
	public double Temp { get; set; }

	[JsonPropertyName("feels_like")]
	public double FeelsLike { get; set; }

	[JsonPropertyName("temp_min")]
	public double TempMin { get; set; }

	[JsonPropertyName("temp_max")]
	public double TempMax { get; set; }

	[JsonPropertyName("pressure")]
	public int Pressure { get; set; }

	[JsonPropertyName("humidity")]
	public int Humidity { get; set; }
}

public class WeeklyWeatherRain
{
	[JsonPropertyName("3h")]
	public double ThreeHour { get; set; }
}


public class WeeklyWeatherSys
{
	[JsonPropertyName("pod")]
	public string? Pod { get; set; }
}

public class WeeklyWeatherCityInfo
{
	[JsonPropertyName("id")]
	public int Id { get; set; }

	[JsonPropertyName("name")]
	public string? Name { get; set; }

	[JsonPropertyName("coord")]
	public required Coordinates Coord { get; set; }

	[JsonPropertyName("country")]
	public string? Country { get; set; }

	[JsonPropertyName("population")]
	public int Population { get; set; }

	[JsonPropertyName("timezone")]
	public int Timezone { get; set; }

	[JsonPropertyName("sunrise")]
	public long Sunrise { get; set; }

	[JsonPropertyName("sunset")]
	public long Sunset { get; set; }
}