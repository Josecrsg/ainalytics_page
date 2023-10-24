// Importando la función "configureStore" de la librería "@reduxjs/toolkit".
import { configureStore } from '@reduxjs/toolkit'

// Importando el reducidor "userReducer" del archivo "user/userSlice".
import userReducer from './user/userSlice'

// Configurando y exportando el store de Redux.
export const store = configureStore({
  // Objeto que define los reducidores que se usarán en el store.
  reducer: {
    user: userReducer,    // Asociando el "userReducer" al campo "user" del estado global.
  },

  /**
   * Este comentario explica que el middleware personalizado a continuación 
   * se usa para evitar errores cuando las variables no están serializadas.
   */
  
  // Configurando middleware para el store.
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      // Deshabilitando la comprobación de serialización.
      serializableCheck: false,
  }),
})
