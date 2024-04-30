import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useWeather } from '../context/WeatherContext';
import TemperatureGraph from '../components/ForecastGraph';
import WeatherCard from '../components/WeatherCard';
import PostcodeForm from '../components/PostcodeForm';

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
        if (input.match(/^\d+$/)) {
            setPostcode(input);
        } else {
            alert('Please enter a valid postcode.');
        }
    };

    return (
        <div>
            {loading ? (
                <p>Fetching weather data...</p>
            ) : error ? (
                <div>
                    <p>{errorMessage}</p>
                    <PostcodeForm input={input} setInput={setInput} handleSubmit={handleSubmit} />
                </div>
            ) : (
                <div>
                    <div>
                        <WeatherCard />
                    </div>
                    <PostcodeForm input={input} setInput={setInput} handleSubmit={handleSubmit} />
                    <div>
                        <TemperatureGraph />
                    </div>
                </div>
            )}

        </div>
    );
};

export default Home;