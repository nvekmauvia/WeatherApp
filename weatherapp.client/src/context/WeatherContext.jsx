import { createContext, useState, useContext, useEffect } from 'react';
import { fetchWeather } from '../services/weatherService';
import PropTypes from 'prop-types';

const WeatherContext = createContext();

function WeatherProvider({ children }) {
    const [postcode, setPostcode] = useState(4108);
    const [location, setLocation] = useState(null);
    const [currentWeather, setCurrentWeather] = useState(null);
    const [weeklyWeather, setWeeklyWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (!postcode) return;
        setLoading(true);
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

        const fetchLocation = async () => {
            try {
                const locationData = await fetchWeather(apiBaseUrl, `/api/weather/location/${postcode}`);
                setLocation(locationData);
            } catch (error) {
                setErrors(prevErrors => [...prevErrors, error.message]);
                setLoading(false);
            }
        };

        fetchLocation();
    }, [postcode]);

    useEffect(() => {
        if (!location) return;

        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
        const fetchWeatherData = async () => {
            try {
                const currentWeatherData = await fetchWeather(apiBaseUrl, `/api/weather/current/${location.lat}/${location.lon}`);
                setCurrentWeather(currentWeatherData);
            } catch (error) {
                setErrors(prevErrors => [...prevErrors, error.message]);
            }

            try {
                const weeklyWeatherData = await fetchWeather(apiBaseUrl, `/api/weather/weekly/${location.lat}/${location.lon}`);
                setWeeklyWeather(weeklyWeatherData);
            } catch (error) {
                setErrors(prevErrors => [...prevErrors, error.message]);
            }

            setLoading(false);
        };

        fetchWeatherData();
    }, [location]);

    return (
        <WeatherContext.Provider value={{ postcode, setPostcode, location, currentWeather, weeklyWeather, loading, errors }}>
            {children}
        </WeatherContext.Provider>
    );
}

function useWeather() {
    const context = useContext(WeatherContext);
    if (context === undefined) {
        throw new Error('useWeather not in WeatherProvider');
    }
    return context;
}

WeatherProvider.propTypes = {
    children: PropTypes.node
};


export { WeatherProvider, useWeather };