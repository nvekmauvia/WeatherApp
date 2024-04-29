import { useEffect } from 'react';
import { useState } from 'react';
import TemperatureGraph from '../components/ForecastGraph';
import WeatherCard from '../components/WeatherCard';
import { useWeather } from '../context/WeatherContext';
import { useParams } from 'react-router-dom';

const Home = () => {
    const { postcode } = useParams();
    const { setPostcode, loading, error } = useWeather();
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
            <h1>OZ Weather Now</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Enter postcode"
                />
                <button type="submit">Get Weather</button>
            </form>

            {loading ? (
                <p>Loading... waiting on backend</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <div>
                    <div>
                        <WeatherCard />
                    </div>
                    <div>
                        <TemperatureGraph />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;