import {
    WiThermometer,
    WiStrongWind,
    WiHumidity,
    WiBarometer,
    WiFog,
    WiDirectionUp,
  } from "react-icons/wi";
  import { HiOutlineLocationMarker } from "react-icons/hi";
  
  function WeatherCard({ weather, windDirection , isCelsius}) {
    const convertTemp = (temp) =>
        isCelsius ? temp : (temp * 9) / 5 + 32;
    
    return (
      <div className="text-center space-y-4">
        <div className="flex justify-center items-center gap-2 text-2xl">
          <HiOutlineLocationMarker />
          <h1 className="font-bold">{weather.name}</h1>
        </div>
  
        <img
          className="mx-auto"
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
          alt="weather icon"
        />
  
        <p className="text-4xl">{Math.round(convertTemp(weather.main.temp.toFixed(1)))}°{isCelsius ? "C" : "F"}</p>
        <p className="capitalize text-lg">{weather.weather[0].description}</p>
  
        <div className="grid grid-cols-2 gap-4 mt-6 text-sm text-left max-w-md mx-auto">
          <p className="flex items-center gap-2">
            <WiThermometer /> Temp min: {Math.round(convertTemp(weather.main.temp_min))}°{isCelsius ? "C" : "F"}
          </p>
          <p className="flex items-center gap-2">
            <WiThermometer /> Temp max: {Math.round(convertTemp(weather.main.temp_max))}°{isCelsius ? "C" : "F"}
          </p>
          <p className="flex items-center gap-2">
            <WiStrongWind /> Wind: {weather.wind.speed} m/s
          </p>
          <p className="flex items-center gap-2">
            <WiDirectionUp /> Direction: {windDirection(weather.wind.deg)}
          </p>
          <p className="flex items-center gap-2">
            <WiHumidity /> Humidity: {weather.main.humidity}%
          </p>
          <p className="flex items-center gap-2">
            <WiFog /> Visibility: {(weather.visibility / 1000).toFixed(1)} km
          </p>
          <p className="flex items-center gap-2">
            <WiBarometer /> Pressure: {weather.main.pressure} hPa
          </p>
        </div>
      </div>
    );
  }
  
export default WeatherCard;
  