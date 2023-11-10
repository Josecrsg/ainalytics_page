// Función para crear un objeto de error personalizado con un código de estado y un mensaje
export const errorHandler = (statusCode, message) => {
    // Crear una instancia de Error
    const error = new Error();

    // Establecer el código de estado en el objeto de error
    error.statusCode = statusCode;

    // Establecer el mensaje de error en el objeto de error
    error.message = message;

    // Devolver el objeto de error creado
    return error;
};
