/**Esto se considera un middleware para controlar los errores */

export const errorHandler = (statusCode, message)=>{
    const error = new Error()
    error.statusCode = statusCode
    error.message = message
    return error
};