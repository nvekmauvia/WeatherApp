async function fetchWeather(apiBaseUrl, endpoint) {
    const response = await fetch(`${apiBaseUrl}${endpoint}`);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
}

export { fetchWeather };