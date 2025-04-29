const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

export async function getWeatherByCoords(lat, lon) {
    
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

    );
  
    if (!res.ok) {
      throw new Error("Can't get the weather");
    }
  
    return await res.json();
  }
  
  export const getWeatherByCity = async (city) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`
    );
    if (!response.ok) throw new Error("City not found");
    return await response.json();
  };
  
  export const getForecastByCity = async (city) => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
    if (!res.ok) throw new Error("Error fetching forecast");
    return await res.json();
  };
  
