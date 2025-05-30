import React from "react";

function ForecastList({ forecast, isCelsius }) {
  const dailyData = {};

  if (!forecast || !forecast.list) {
    return null; 
  }

  forecast.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!dailyData[date]) {
      dailyData[date] = [];
    }
    dailyData[date].push(item);
  });
  
  const filteredForecast = Object.entries(dailyData).map(([date, items]) => {
    const temps = items.map((i) => i.main.temp);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    const middleItem = items[Math.floor(items.length / 2)];

    return {
      date,
      minTemp,
      maxTemp,
      icon: middleItem.weather[0].icon,
      description: middleItem.weather[0].description,
    };
  });

 
  const today = new Date().toISOString().split("T")[0];

  const forecastFromTomorrow = filteredForecast.filter((item) => item.date > today);

  const convertTemp = (temp) =>
    isCelsius ? temp : (temp * 9) / 5 + 32;

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Forecast (next 5 days)</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {forecastFromTomorrow.slice(0, 5).map((item) => (
          <div
            key={item.date}
            className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 rounded-xl text-center"
          >
            <p className="font-bold">
              {new Date(item.date).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
              alt={item.description}
              className="mx-auto"
            />
            <p className="text-sm capitalize mb-1">{item.description}</p>
            <p className="text-sm">
              🌡 Max: {Math.round(convertTemp(item.maxTemp))}°{isCelsius ? "C" : "F"}
            </p>
            <p className="text-sm">
              ❄️ Min: {Math.round(convertTemp(item.minTemp))}°{isCelsius ? "C" : "F"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastList;
