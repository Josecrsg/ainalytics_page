// Comentario explicativo sobre la funcionalidad del código a continuación.
/**Esto se considera un middleware para controlar los errores */

// Definición de la función "errorHandler".
export const errorHandler = (statusCode, message)=>{

    // Creando una nueva instancia del objeto Error.
    const error = new Error()

    // Asignando el código de estado al objeto de error.
    error.statusCode = statusCode

    // Asignando el mensaje al objeto de error.
    error.message = message

    // Retornando el objeto de error.
    return error
};
