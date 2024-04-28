namespace WeatherApp.Server.Models.Common;
using System.Text.Json.Serialization;

public class Clouds
{
    [JsonPropertyName("all")]
    public int All { get; set; }
}