import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'

export const store = configureStore({
  reducer: {user: userReducer},
  /**Este middleware se añade para que no haya errores si las variables no estan serializadas */
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false,
  }),
})