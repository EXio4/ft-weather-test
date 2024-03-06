import axios from 'axios'


export type MyLocationResult = {
    status: 'success' | 'fail'
    country: string
    regionName: string
    city: string
    lat: number
    lon: number
}

async function getMyLocation(): Promise<MyLocationResult> {
  const { data } = await axios.get('http://ip-api.com/json')
  return data
}

export interface WeatherApiResponse {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    current: CurrentWeather;
    daily: DailyForecast[];
}

interface CurrentWeather {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: WeatherDescription[];
}

interface WeatherDescription {
    id: number;
    main: string;
    description: string;
    icon: string; 
}


interface DailyForecast {
    dt: number;
    sunrise: number;
    sunset: number;
    moonrise: number;
    moonset: number;
    moon_phase: number;
    summary: string; // Added for descriptive text
    temp: Temperature;
    feels_like: Temperature; 
    pressure: number;
    humidity: number;
    dew_point: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: WeatherDescription[];
    clouds: number;
    pop: number; // Probability of precipitation
    rain?: number; // Optional for rain accumulation
    uvi: number;
}

interface Temperature {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
}

async function getWeatherData(owmKey: string, lat: number, lon: number): Promise<WeatherApiResponse> {
  const { data } = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${owmKey}`)
  return data
}

export type GeocodeResult = {
    name: string
    lat: number
    lon: number
    country: string
    state?: string
}

async function findLocation(owmKey: string, query: string): Promise<GeocodeResult[]> {
  const { data } = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${owmKey}`)
  return data
}

export { getMyLocation, getWeatherData, findLocation }