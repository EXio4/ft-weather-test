import {
  call,
  select,
  put,
  takeEvery,
  takeLatest,
  fork,
  all,
  debounce,
  throttle,
} from 'redux-saga/effects'
import {
  findLocation,
  GeocodeResult,
  getMyLocation,
  getWeatherData,
  MyLocationResult,
  WeatherApiResponse,
} from '../api'
import {
  LocationData,
  PureWeatherData,
  CurrentWeatherData,
  WeatherEntry,
  WeatherItem,
} from '../types'
import {
  RA_AssignAPIKey,
  addLocation,
  RA_UpdateSearchQuery,
  updateSearchResults,
  RA_AddLocation,
  updateLocation,
  RA_TriggerLocationUpdate,
} from './actions'
import { ReduxState } from './reducers'

function convertMyLocationResultToLocationData(
  result: MyLocationResult,
): LocationData {
  return {
    name: result.city, // Combining city and region
    latitude: result.lat,
    longitude: result.lon,
    country: result.country,
    state: result.regionName, // Using regionName as the state
  }
}

function convertApiResponseToPureWeatherData(
  response: WeatherApiResponse,
): PureWeatherData {
  // Extract current weather
  const current: CurrentWeatherData = {
    temperature: response.current.temp,
    feels_like: response.current.feels_like,
    humidity: response.current.humidity,
    pressure: response.current.pressure,
    weather_id: response.current.weather[0].id, // Assuming there's at least one weather description
    time: response.current.dt,
  }

  // Extract daily forecasts
  const daily: WeatherEntry[] = response.daily.map((day) => ({
    temperature: {
      day: day.temp.day,
      min: day.temp.min,
      max: day.temp.max,
      night: day.temp.night,
      evening: day.temp.eve,
      morning: day.temp.morn,
    },
    feels_like: {
      day: day.feels_like.day,
      night: day.feels_like.night,
      evening: day.feels_like.eve,
      morning: day.feels_like.morn,
    },
    pressure: day.pressure,
    humidity: day.humidity,
    weather_id: day.weather[0].id,
    time: day.dt,
  }))

  // Construct the final result
  return {
    current,
    daily,
  }
}

function convertGeocodeResultToLocationData(
  result: GeocodeResult,
): LocationData {
  return {
    name: result.name,
    latitude: result.lat,
    longitude: result.lon,
    country: result.country,
    state: result.state,
  }
}

function* triggerMyLocation(action: RA_AssignAPIKey) {
  try {
    const owmKey = action.openWeatherMap
    // const position = (yield call(getMyLocation)) as Generator<any, any, any>;
    const position: MyLocationResult = yield call(getMyLocation)

    // const weather: WeatherApiResponse = yield call(getWeatherData, owmKey, position.lat, position.lon)
    // yield put(addLocation(convertMyLocationResultToLocationData(position), convertApiResponseToPureWeatherData(weather)))
    yield put(addLocation('my-location', convertMyLocationResultToLocationData(position)))
  } catch (err) {
    console.error('error', err)
  }
}

function* handleSearchQuery(action: RA_UpdateSearchQuery) {
  try {
    const owmKey: string | null = yield select(
      (state: ReduxState) => state.keys?.openWeatherMap,
    )
    if (!owmKey) {
      console.error('OpenWeatherMap API key not set')
      return
    }
    const results: GeocodeResult[] = yield call(
      findLocation,
      owmKey,
      action.query,
    )
    yield put(
      updateSearchResults(results.map(convertGeocodeResultToLocationData)),
    )
  } catch (err) {
    console.error('error', err)
  }
}

function* handleAddLocation(action: RA_AddLocation) {
  try {
    const owmKey: string | null = yield select(
      (state: ReduxState) => state.keys?.openWeatherMap,
    )
    if (!owmKey) {
      console.error('OpenWeatherMap API key not set')
      return
    }
    const weather: WeatherApiResponse = yield call(
      getWeatherData,
      owmKey,
      action.location.latitude,
      action.location.longitude,
    )
    yield put(
      updateLocation(
        action.uid,
        null,
        convertApiResponseToPureWeatherData(weather),
      ),
    )
  } catch (err) {
    console.error('error', err)
  }
}

function* handleTriggerUpdate(action: RA_TriggerLocationUpdate) {
  try {
    const owmKey: string | null = yield select(
      (state: ReduxState) => state.keys?.openWeatherMap,
    )
    if (!owmKey) {
      console.error('OpenWeatherMap API key not set')
      return
    }

    const existingLocation: WeatherItem | undefined = yield select((state: ReduxState) =>
      state.locations.find((loc) => loc.uid === action.uid),
    )
    if (!existingLocation) {
      // location was deleted while waiting for response or the query was invalid
      return
    }

    const weather: WeatherApiResponse = yield call(
      getWeatherData,
      owmKey,
      existingLocation.location.latitude,
      existingLocation.location.longitude,
    )
  
    yield put(
      updateLocation(
        action.uid,
        null,
        convertApiResponseToPureWeatherData(weather),
      ),
    )

  } catch (err) {
    console.error('error', err)
  }
}

export function* rootSaga() {
  yield all([
    takeLatest('apiKeys/assign', triggerMyLocation),
    debounce(500, 'search/update_query', handleSearchQuery),
    takeEvery('locations/add', handleAddLocation),
    throttle(5000, 'locations/trigger_update', handleTriggerUpdate),
  ])
}
