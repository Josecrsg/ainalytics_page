// Importar el módulo 'jsonwebtoken' para verificar un token de autenticación
import jwt from 'jsonwebtoken';

// Función de middleware para verificar un token de autenticación en las solicitudes
export const verifyTokenMessage = (req, res, next) => {
    // Obtener el token del encabezado de la solicitud
    const token = req.headers['authorization'];

    // Comprobar si el token no está presente en la solicitud
    if (!token) {
        return res.status(403).send('Se requiere un token para la autenticación'); // Devolver un error 403 (Prohibido) si el token no está presente
    }

    try {
        // Verificar el token utilizando la clave secreta definida en la variable de entorno JWT_SECRET
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Agregar la información del usuario decodificada a la solicitud para su posterior uso
        req.user = decoded;
    } catch (error) {
        return res.status(401).send('Token inválido'); // Devolver un error 401 (No autorizado) si el token es inválido o ha caducado
    }

    // Pasar al siguiente middleware si el token es válido
    return next();
};
