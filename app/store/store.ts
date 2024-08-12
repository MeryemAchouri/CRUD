import { configureStore } from '@reduxjs/toolkit'
import crudReducer from './crudReducer'
export const store = configureStore({
  reducer: {
    user: crudReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch