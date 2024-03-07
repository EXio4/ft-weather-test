import { APIKeys, WeatherItem, LocationData } from '../types'
import { ReduxAction } from './actions'

export type ReduxState = {
  keys: APIKeys | null
  // first location is always the user's location
  locations: WeatherItem[]
  search: {
    query: string
    results: LocationData[]
  }
}

/*
    TODO: investigate how to use ReduxAction on reducers
*/

export const apiKeysReducer = (
  state: APIKeys | null = null,
  action: ReduxAction,
): APIKeys | null => {
  switch (action.type) {
    case 'apiKeys/assign':
      return { openWeatherMap: action.openWeatherMap }
    default:
      return state
  }
}

export const locationsReducer = (
  state: WeatherItem[] = [],
  action: ReduxAction,
): WeatherItem[] => {
  switch (action.type) {
    case 'locations/add':
      return [
        ...state,
        {
          type: action.kind,
          uid: action.uid,
          location: action.location,
          data: action.data,
        },
      ]
    case 'locations/remove':
      return state.filter((loc) => loc.uid !== action.uid)
    case 'locations/update':
      return state.map((loc) => {
        if (loc.uid === action.uid) {
          return {
            ...loc,
            location: action.location ?? loc.location,
            data: action.data,
          }
        }
        return loc
      })
    default:
      return state
  }
}

export const searchReducer = (
  state: { query: string; results: LocationData[] } = {
    query: '',
    results: [],
  },
  action: ReduxAction,
): { query: string; results: LocationData[] } => {
  switch (action.type) {
    case 'search/update_query':
      return { ...state, query: action.query }
    case 'search/update_results':
      return { ...state, results: action.results }
    case 'search/clear_results':
      return { ...state, query: '', results: [] }
    default:
      return state
  }
}
