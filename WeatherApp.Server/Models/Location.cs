using System.Text.Json.Serialization;

public class Location
{
	[JsonPropertyName("zip")]
	public string? Zip { get; set; }

	[JsonPropertyName("name")]
	public string? Name { get; set; }

	[JsonPropertyName("lat")]
	public required double Lat { get; set; }

	[JsonPropertyName("lon")]
	public required double Lon { get; set; }

	[JsonPropertyName("country")]
	public string? Country { get; set; }
}
