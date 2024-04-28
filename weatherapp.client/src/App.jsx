import './App.css';
import Home from './pages/Home';
import { WeatherProvider } from './context/WeatherContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <WeatherProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/:postcode" element={<Home />} />
                </Routes>
            </Router>
        </WeatherProvider>
    );
}

export default App;