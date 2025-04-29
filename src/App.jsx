import { useEffect, useState } from "react";
import { getWeatherByCoords, getWeatherByCity, getForecastByCity } from "./api/weather";
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastList from './components/ForecastList';
import { FaLocationArrow } from "react-icons/fa";
import Footer from "./components/Footer";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState("");
  const [isCelsius, setIsCelsius] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchInitialLocation = async () => {
      setLoading(true);
      try {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const { latitude, longitude } = pos.coords;
            const weatherData = await getWeatherByCoords(latitude, longitude);
            const cityName = weatherData.name;
            const forecastData = await getForecastByCity(cityName);
            setWeather(weatherData);
            setForecast(forecastData);
          },
          async () => {
            const defaultCity = "Lima";
            try {
              const [weatherData, forecastData] = await Promise.all([
                getWeatherByCity(defaultCity),
                getForecastByCity(defaultCity),
              ]);
              setWeather(weatherData);
              setForecast(forecastData);
            } catch (fallbackErr) {
              console.error("Fallback error:", fallbackErr);
              setErrorMsg("Unable to fetch weather.");
            }
          }
        );
      } catch (err) {
        console.error("General error:", err);
        setErrorMsg("Unable to fetch weather.");
      } finally {
        setLoading(false);
      }
    };
    fetchInitialLocation();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city) return;

    try {
      setLoading(true);
      setErrorMsg("");
      const [weatherData, forecastData] = await Promise.all([
        getWeatherByCity(city),
        getForecastByCity(city),
      ]);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      console.error(err);
      setErrorMsg("City not found 😕");
    } finally {
      setLoading(false);
      setCity("");
    }
  };

  const handleUseLocation = () => {
    setLoading(true);
    setErrorMsg("");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const weatherData = await getWeatherByCoords(latitude, longitude);
          const cityName = weatherData.name;
          const forecastData = await getForecastByCity(cityName);
          setWeather(weatherData);
          setForecast(forecastData);
        } catch (err) {
          console.error("API error:", err);
          setErrorMsg("Failed to fetch weather from your location.");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
        setErrorMsg("We couldn't access your location.");
        setLoading(false);
      }
    );
  };

  const windDirection = (deg) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  };

  const toggleUnit = () => {
    setIsCelsius(!isCelsius);
  };
  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-blue-900 to-blue-600 text-white flex flex-col items-center justify-start p-8 overflow-y-auto">
    <div className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-3xl space-y-6">
      {/* SearchBar */}
      <SearchBar city={city} setCity={setCity} handleSearch={handleSearch} />
  
      {/* Switch y botón */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Switch */}
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setIsCelsius(true)}
            className={`px-4 py-2 rounded-md font-semibold transition ${
              isCelsius ? 'bg-white text-blue-700 shadow' : 'bg-blue-700 text-white'
            }`}
          >
            °C
          </button>
          <button
            onClick={() => setIsCelsius(false)}
            className={`px-4 py-2 rounded-md font-semibold transition ${
              !isCelsius ? 'bg-white text-blue-700 shadow' : 'bg-blue-700 text-white'
            }`}
          >
            °F
          </button>
        </div>
  
        
          <button
            onClick={handleUseLocation}
            className="flex items-center gap-2 bg-white text-blue-700 px-4 py-2 rounded-md font-semibold shadow hover:bg-gray-100 transition w-full md:w-auto max-w-xs self-center md:self-auto"
          >
            <FaLocationArrow className="animate-pulse" /> Use current location
          </button>
        
      </div>
  
      {/* Loader */}
      {loading && (
        <div className="flex justify-center items-center mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      )}
  
      {/* Error */}
      {errorMsg && (
        <p className="text-center text-red-300 font-semibold mt-4">{errorMsg}</p>
      )}
  
      {/* Weather Info */}
      {weather && (
        <>
          <WeatherCard weather={weather} windDirection={windDirection} isCelsius={isCelsius} />
          {forecast && (
            <div className="w-full">
              <ForecastList forecast={forecast} isCelsius={isCelsius} />
            </div>
          )}
        </>
      )}
      <Footer/>
    </div>
  </div>
  

  
  );
}

export default App;
