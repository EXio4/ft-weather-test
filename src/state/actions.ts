import { v4 as uuidv4 } from 'uuid'
import { LocationType, LocationData, PureWeatherData } from '../types'

export const ASSIGN_API_KEY: 'apiKeys/assign' = 'apiKeys/assign'
export type RA_AssignAPIKey = {
  type: typeof ASSIGN_API_KEY
  openWeatherMap: string
}

export const TRIGGER_LOCATION_UPDATE: 'locations/update' = 'locations/update'
export type RA_TriggerLocationUpdate = {
  type: typeof TRIGGER_LOCATION_UPDATE
  uid: string
}

export const ADD_LOCATION: 'locations/add' = 'locations/add'
export type RA_AddLocation = {
  type: typeof ADD_LOCATION
  kind: LocationType
  uid: string
  location: LocationData
  data?: PureWeatherData
}

export const REMOVE_LOCATION: 'locations/remove' = 'locations/remove'
export type RA_RemoveLocation = {
  type: typeof REMOVE_LOCATION
  uid: string
}

export const UPDATE_LOCATION: 'locations/update' = 'locations/update'
export type RA_UpdateLocation = {
  type: typeof UPDATE_LOCATION
  uid: string
  location?: LocationData
  data: PureWeatherData
}

export const TRIGGER_UPDATE_LOCATION: 'locations/trigger_update' = 'locations/trigger_update'
export type RA_TriggerUpdateLocation = {
  type: typeof TRIGGER_UPDATE_LOCATION
  uid: string
}

export const UPDATE_SEARCH_QUERY: 'search/update_query' = 'search/update_query'
export type RA_UpdateSearchQuery = {
  type: typeof UPDATE_SEARCH_QUERY
  query: string
}

export const UPDATE_SEARCH_RESULTS: 'search/update_results' = 'search/update_results'
export type RA_UpdateSearchResults = {
  type: typeof UPDATE_SEARCH_RESULTS
  results: LocationData[]
}

export const SELECT_SEARCH_RESULT: 'search/select_result' = 'search/select_result'
export type RA_SelectSearchResult = {
  type: typeof SELECT_SEARCH_RESULT
  result: LocationData
}

export const CLEAR_SEARCH_RESULTS: 'search/clear_results' = 'search/clear_results'
export type RA_ClearSearchResults = {
  type: typeof CLEAR_SEARCH_RESULTS
}

export type ReduxAction =
  | RA_AssignAPIKey
  | RA_AddLocation
  | RA_RemoveLocation
  | RA_UpdateLocation
  | RA_UpdateSearchQuery
  | RA_UpdateSearchResults
  | RA_ClearSearchResults

export const assignAPIKey = (openWeatherMap: string): RA_AssignAPIKey => ({
  type: ASSIGN_API_KEY,
  openWeatherMap: openWeatherMap,
})

export const addLocation = (
  kind: LocationType,
  location: LocationData,
  data?: PureWeatherData,
): RA_AddLocation => ({
  type: ADD_LOCATION,
  kind: kind,
  uid: uuidv4(),
  location: location,
  data: data,
})

export const removeLocation = (uid: string): RA_RemoveLocation => ({
  type: REMOVE_LOCATION,
  uid: uid,
})

export const updateLocation = (
  uid: string,
  location: LocationData | null,
  data: PureWeatherData,
): RA_UpdateLocation => ({
  type: UPDATE_LOCATION,
  uid: uid,
  location: location === null ? undefined : location,
  data: data,
})

export const triggerUpdateLocation = (uid: string): RA_TriggerUpdateLocation => ({
  type: TRIGGER_UPDATE_LOCATION,
  uid: uid,
})

export const updateSearchQuery = (query: string): RA_UpdateSearchQuery => ({
  type: UPDATE_SEARCH_QUERY,
  query: query,
})

export const updateSearchResults = (
  results: LocationData[],
): RA_UpdateSearchResults => ({
  type: UPDATE_SEARCH_RESULTS,
  results: results,
})

export const clearSearchResults = (): RA_ClearSearchResults => ({
  type: CLEAR_SEARCH_RESULTS,
})
