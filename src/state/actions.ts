import { v4 as uuidv4 } from 'uuid'
import { LocationData, PureWeatherData } from '../types'

export type RA_AssignAPIKey = {
  type: 'apiKeys/assign'
  openWeatherMap: string
}

export type RA_TriggerLocationUpdate = {
  type: 'locations/update'
  uid: string
}

export type RA_AddLocation = {
  type: 'locations/add'
  uid: string
  location: LocationData
  data?: PureWeatherData
}

export type RA_RemoveLocation = {
  type: 'locations/remove'
  uid: string
}

export type RA_UpdateLocation = {
  type: 'locations/update'
  uid: string
  location?: LocationData
  data: PureWeatherData
}

export type RA_UpdateSearchQuery = {
  type: 'search/update_query'
  query: string
}

export type RA_UpdateSearchResults = {
  type: 'search/update_results'
  results: LocationData[]
}

export type RA_SelectSearchResult = {
  type: 'search/select_result'
  result: LocationData
}

export type RA_ClearSearchResults = {
  type: 'search/clear_results'
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
  type: 'apiKeys/assign',
  openWeatherMap: openWeatherMap,
})

export const addLocation = (
  location: LocationData,
  data?: PureWeatherData,
): RA_AddLocation => ({
  type: 'locations/add',
  uid: uuidv4(),
  location: location,
  data: data,
})

export const removeLocation = (uid: string): RA_RemoveLocation => ({
  type: 'locations/remove',
  uid: uid,
})

export const updateLocation = (
  uid: string,
  location: LocationData | null,
  data: PureWeatherData,
): RA_UpdateLocation => ({
  type: 'locations/update',
  uid: uid,
  location: location === null ? undefined : location,
  data: data,
})

export const updateSearchQuery = (query: string): RA_UpdateSearchQuery => ({
  type: 'search/update_query',
  query: query,
})

export const updateSearchResults = (
  results: LocationData[],
): RA_UpdateSearchResults => ({
  type: 'search/update_results',
  results: results,
})

export const clearSearchResults = (): RA_ClearSearchResults => ({
  type: 'search/clear_results',
})
