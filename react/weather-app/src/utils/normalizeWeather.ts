import moment from 'moment';

export const normalizeCurrentWeather = (data): any => {
  // return {
  //   id: data.id,
  //   cityName: data.name,
  //   date: moment.unix(data.dt).format("DD.MM.YY"),
  //   temperature: data.main.temp,
  //   perceivedTemperature: data.main['feels_like'],
  //   humidity: data.main.humidity,
  //   weather: data.weather,
  //   windSpeed: data.wind.speed,
  //   lat: data.coord.lat,
  //   lon: data.coord.lon,
  // }

  return {
    // id: data.id,
    cityName: data.location.name,
    date: moment.unix(data.current.last_updated_epoch).format("DD.MM.YY"),
    temperature: data.current.temp_c,
    perceivedTemperature: data.current.feelslike_c,
    humidity: data.current.humidity,
    weather: [{
      description: data.current.condition.text,
      icon: data.current.condition.icon
    }],
    windSpeed: data.current.wind_kph,
    lat: data.location.lat,
    lon: data.location.lon,
  }
}

export const normalizeDailyWeather = (data, cityName) => {

  // const daily = data.daily.map(item => ({
  //   cityName,
  //   date: moment.unix(item.dt).format("DD.MM.YY"),
  //   temperature: item.temp.day,
  //   perceivedTemperature: item['feels_like'].day,
  //   humidity: item.humidity,
  //   windSpeed: item['wind_speed'],
  //   weather: item.weather,
  // }));


  const daily = data.forecast.forecastday.map(item => ({
    cityName,
    date: moment.unix(item.date_epoch).format("DD.MM.YY"),
    temperature: item.day.maxtemp_c,
    // perceivedTemperature: item['feels_like'].day,
    humidity: item.day.avghumidity,
    windSpeed: item.day.maxwind_kph,
    weather: [{
     description:   item.day.condition.text,
     icon:   item.day.condition.icon,
    }],
  }));

  return {
    daily,
  }
}


