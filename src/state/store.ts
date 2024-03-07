import { configureStore } from '@reduxjs/toolkit'
import {
  ReduxState,
  apiKeysReducer,
  locationsReducer,
  searchReducer,
} from './reducers'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './sagas'
import { ReduxAction } from './actions'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore<ReduxState, ReduxAction>({
  reducer: {
    keys: apiKeysReducer,
    locations: locationsReducer,
    search: searchReducer,
  },
  // TODO: see why this needed an any cast
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware) as any,
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
