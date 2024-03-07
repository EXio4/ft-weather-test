export type APIKeys = {
  openWeatherMap: string
}

export type LocationType = 'my-location' | 'search'

export type LocationData = {
  name: string
  latitude: number
  longitude: number
  country: string
  state?: string // where available
}

export type WeatherEntry = {
  temperature: {
    day: number
    min: number
    max: number
    night: number
    evening: number
    morning: number
  }
  feels_like: {
    day: number
    night: number
    evening: number
    morning: number
  }
  pressure: number
  humidity: number
  weather_id: number
  time: number
}

export type CurrentWeatherData = {
  temperature: number
  feels_like: number
  humidity: number
  pressure: number
  weather_id: number // https://openweathermap.org/weather-conditions
  time: number
}

export type PureWeatherData = {
  current: CurrentWeatherData
  daily: WeatherEntry[]
}

export type WeatherItem = {
  // we add this tag to make an attempt at copying Apple's 'My Location' indicator
  type: LocationType
  uid: string
  location: LocationData
  data?: PureWeatherData
}
