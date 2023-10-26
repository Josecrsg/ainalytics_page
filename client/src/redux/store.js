import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import storage from 'redux-persist/lib/storage'
import {persistReducer, persistStore} from 'redux-persist'


const rootReducer = combineReducers({user: userReducer})

const persistConfig ={
  key: 'root',
  storage,
  version:1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// Configurando y exportando el store de Redux.
export const store = configureStore({  
  reducer: persistedReducer,// Objeto que define los reducidores que se usarán en el store
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware({        
        serializableCheck: false,
  }),
})

export const persistor = persistStore(store)