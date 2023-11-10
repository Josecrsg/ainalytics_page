// Importar el módulo 'errorHandler' para manejar errores personalizados
import { errorHandler } from "./errors.js";

// Importar el módulo 'jsonwebtoken' para verificar un token de autenticación
import jwt from "jsonwebtoken";

// Función de middleware para verificar un token de autenticación en las solicitudes
export const verifyToken = (req, res, next) => {
    // Obtener el token de autenticación de las cookies de la solicitud
    const token = req.cookies.access_token;

    // Comprobar si el token no está presente en las cookies
    if (!token) {
        return next(errorHandler(401, 'No autorizado')); // Devolver un error 401 (No autorizado) si el token no está presente
    }

    // Verificar el token utilizando la clave secreta definida en la variable de entorno JWT_SECRET
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(errorHandler(403, 'Prohibido')); // Devolver un error 403 (Prohibido) si el token es inválido o ha caducado
        }

        // Agregar la información del usuario decodificada a la solicitud para su posterior uso
        req.user = user;

        // Pasar al siguiente middleware si el token es válido
        next(); // Si se encuentra el token, continúa con el siguiente proceso o función donde esté configurado, en este caso en user.route.jsx
    });
};
