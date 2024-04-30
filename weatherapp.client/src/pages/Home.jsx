import { useEffect } from 'react';
import { useState } from 'react';
import TemperatureGraph from '../components/ForecastGraph';
import WeatherCard from '../components/WeatherCard';
import { useWeather } from '../context/WeatherContext';
import { useParams } from 'react-router-dom';

const Home = () => {
    const { postcode } = useParams();
    const { setPostcode, loading, error, errorMessage } = useWeather();
    const [input, setInput] = useState('');

    useEffect(() => {
        if (postcode) {
            setPostcode(postcode);
        }
    }, [postcode, setPostcode]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setPostcode(input);
    };

    return (
        <div>
            {loading ? (
                <p>Fetching weather data...</p>
            ) : error ? (
                <div>
                    <p>{errorMessage}</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="number"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder="Enter postcode"
                        />
                        <button type="submit">Get Weather</button>
                    </form>
                </div>
            ) : (
                <div>
                    <div>
                        <WeatherCard />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="number"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder="Enter postcode"
                        />
                        <button type="submit">Get Weather</button>
                    </form>
                    <div>
                        <TemperatureGraph />
                    </div>
                </div>
            )}

        </div>
    );
};

export default Home;