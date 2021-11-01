import moment from 'moment';

export const normalizeCurrentWeather = (data): any => {
  return {
    id: data.id,
    cityName: data.name,
    date: moment.unix(data.dt).format("DD.MM.YY"),
    temperature: data.main.temp,
    perceivedTemperature: data.main['feels_like'],
    humidity: data.main.humidity,
    weather: data.weather,
    windSpeed: data.wind.speed,
    lat: data.coord.lat,
    lon: data.coord.lon,
  }
}

export const normalizeDailyWeather = (data, cityName) => {

  const daily = data.daily.map(item => ({
    cityName,
    date: moment.unix(item.dt).format("DD.MM.YY"),
    temperature: item.temp.day,
    perceivedTemperature: item['feels_like'].day,
    humidity: item.humidity,
    windSpeed: item['wind_speed'],
    weather: item.weather,
  }));

  // daily.unshift({
  //   cityName,
  //   date: moment.unix(data.current.dt).format("DD.MM.YY"),
  //   temperature: data.current.temp,
  //   perceivedTemperature: data.current['feels_like'],
  //   humidity: data.current.humidity,
  //   windSpeed: data.current['wind_speed'],
  //   weather: data.current.weather,
  // })

  return {
    daily,
    lat: data.lat,
    lon: data.lon,
  }
}


