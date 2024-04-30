import './WeatherCard.css';
import { useWeather } from '../context/WeatherContext';

const WeatherCard = () => {
    const { currentWeather } = useWeather();

    function capitalizeWords(str) {
        return str.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    const getImageSrc = (description) => {
        const imageMap = {
            'clear sky': '/weatherIcons/day.svg',
            'few clouds': '/weatherIcons/cloudy-day-1.svg',
            'scattered clouds': '/weatherIcons/cloudy-day-2.svg',
            'broken clouds': '/weatherIcons/cloudy.svg',
            'light rain': '/weatherIcons/rainy-1.svg',
            'moderate rain': '/weatherIcons/rainy-3.svg',
            'heavy intensity rain': '/weatherIcons/rainy-3.svg',
            'very heavy rain': '/weatherIcons/rainy-3.svg',
            'shower rain': '/weatherIcons/rainy-1.svg',
            'rain': '/weatherIcons/rainy-6.svg',
            'thunderstorm': '/weatherIcons/thunder.svg',
            'snow': '/weatherIcons/snowy-6.svg',
            'mist': '/weatherIcons/cloudy.svg'
        };

        const normalizedDescription = description.toLowerCase();
        return imageMap[normalizedDescription] || '/weatherIcons/cloudy-day-1.svg';
    };

    return (
        <div className="weather-card">
            <div className="left-section">
                <h1>{Math.round(currentWeather.main.temp)}°C</h1>
                <img src={getImageSrc(currentWeather.weather[0].description)} alt="Weather Icon" style={{ alignSelf: 'flex-start' }} />
            </div>
            <div className="right-section">
                <h2>{capitalizeWords(currentWeather.weather[0].description)}</h2>
                <p style={{ color: "black" }} ><b>{currentWeather.name}</b></p>
                <p>Humidity: {currentWeather.main.humidity}%</p>
                <p>Wind: {currentWeather.wind.speed} m/s</p>
            </div>
        </div>
    );
};

export default WeatherCard;