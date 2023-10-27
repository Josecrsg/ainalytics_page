// Importando la librería "mongoose" para trabajar con MongoDB.
import mongoose from "mongoose"

// Creando un nuevo esquema (estructura) para el modelo de "User".
const userSchema = new mongoose.Schema({
    // Definiendo el campo "username" con varias propiedades.
    username: {
        // Especificando que el tipo de dato es String.
        type: String,
        // Especificando que este campo es obligatorio.
        required: true,
        // Especificando que este campo debe ser único (no puede haber dos usuarios con el mismo nombre de usuario).
        unique: true,
    },
    // Definiendo el campo "email" con varias propiedades.
    email: {
        // Especificando que el tipo de dato es String.
        type: String,
        // Especificando que este campo es obligatorio.
        required: true,
        // Especificando que este campo debe ser único (no puede haber dos usuarios con el mismo correo electrónico).
        unique: true,
    },
    // Definiendo el campo "password" con varias propiedades.
    password: {
        // Especificando que el tipo de dato es String.
        type: String,
        // Especificando que este campo es obligatorio.
        required: true,        
    },
    avatar: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"

    },
// Indicando que se deben registrar automáticamente las fechas de creación y actualización del registro.
}, {timestamps: true});

/**
 * La variable "User" representa el modelo basado en el esquema "userSchema".
 * Aunque el modelo se llama "User", mongoose crea una colección llamada "users"
 * en la base de datos (pluraliza automáticamente el nombre del modelo).
 */
const User = mongoose.model('User', userSchema);

// Exportando el modelo "User" para poder usarlo en otras partes del código.
export default User;
