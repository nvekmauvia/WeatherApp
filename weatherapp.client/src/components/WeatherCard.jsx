import './WeatherCard.css';  // Assuming you will style using CSS
import { useWeather } from '../context/WeatherContext';

const WeatherCard = () => {
    const { currentWeather } = useWeather();

    return (
        <div className="weather-card">
            <h1>{currentWeather.name}</h1>
            <h2>{currentWeather.main.temp}°C</h2>
            <p>Humidity: {currentWeather.main.humidity}%</p>
            <p>Wind: {currentWeather.wind.speed} m/s</p>
            <p>{currentWeather.weather[0].description}</p>
        </div>
    );
};

export default WeatherCard;