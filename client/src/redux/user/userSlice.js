// Importando la función "createSlice" de la librería "@reduxjs/toolkit".
import { createSlice } from "@reduxjs/toolkit";


// Definiendo un estado inicial para la sección de "user" del store.
const initialState = {
    currentUser: null,   // Estado inicial del usuario actual. Comienza como nulo.
    error: null,        // Estado inicial de errores. Comienza como nulo.
    loading: false,     // Estado inicial de carga. Comienza como false.
};

// Creando un "slice" para manejar acciones y reducidores relacionados con el usuario.
const userSlice = createSlice({
    name: 'user',                       // Nombre del slice.
    initialState,                       // Estado inicial.
    reducers:{                          // Objeto de los diferentes reducidores.
        signInStart: (state) =>{        // Reductor cuando comienza un intento de inicio de sesión.
            state.loading = true;       // Establece el estado de carga en verdadero.
        },
        signInSuccess: (state, action) =>{   // Reductor cuando el inicio de sesión es exitoso.
            state.currentUser = action.payload;  // Establece el usuario actual con la carga útil de la acción.
            state.loading = false;      // Establece el estado de carga en falso.
            state.error = null;         // Restablece cualquier error a nulo.
        },
        signInFailure: (state, action) =>{    // Reductor cuando el inicio de sesión falla.
            state.error = action.payload;  // Establece el error con la carga útil de la acción.
            state.loading = false;      // Establece el estado de carga en falso.            
        },
        updateUserStart: (state) =>{
            state.loading = true
        },
        updateUserSuccess: (state, action) =>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null
        },
        updateUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading =  false;
        },
        deleteUserStart: (state) =>{
            state.loading = false
        },
        deleteUserSuccess: (state) =>{
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        deleteUserFailure: (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        },
    }
})

// Exportando las acciones creadas por "createSlice".
export const {signInStart, 
                signInSuccess, 
                signInFailure, 
                updateUserFailure, 
                updateUserSuccess, 
                updateUserStart,
                deleteUserFailure,
                deleteUserStart,
                deleteUserSuccess,
            } = userSlice.actions;

// Exportando el reducidor creado por "createSlice".
export default userSlice.reducer;

/** 
 * Toda esta información se añade al archivo store.js dentro de el campo reducer:{}
 * Esta nota indica que, después de crear este slice, se deberá agregar 
 * al combinador de reducers en el archivo store.js.
 */
