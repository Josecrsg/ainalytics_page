import Listing from "../models/listing.model.js"; // Importar el modelo Listing
import User from "../models/user.model.js"; // Importar el modelo User
import { errorHandler } from "../utils/errors.js"; // Importar una utilidad de manejo de errores
import bcryptjs from 'bcryptjs'; // Importar bcryptjs para el hash de contraseñas

// Función de prueba para verificar que la ruta de la API está funcionando
export const test = (req, res) => {
    res.json({
        message: 'La ruta de la API está funcionando'
    });
}

// Función para actualizar la información de un usuario
export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id)
        return next(errorHandler(401, 'Solo puedes actualizar tu propia cuenta.'));
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10); // Hash de la nueva contraseña si se proporciona
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar,
                },
            },
            { new: true }
        ); // Actualizar la información del usuario con los datos proporcionados

        const { password, ...rest } = updatedUser._doc;

        res.status(200).json(rest); // Devolver la información actualizada del usuario como respuesta
    } catch (error) {
        next(error); // Manejar cualquier error que ocurra durante la actualización del usuario
    }
};

// Función para eliminar la cuenta de un usuario
export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id)
        return next(errorHandler(401, 'Solo puedes eliminar tu propia cuenta.'));
    try {
        await User.findByIdAndDelete(req.params.id); // Eliminar la cuenta de usuario por su ID
        res.clearCookie('access_token'); // Borrar la cookie de acceso para desconectar al usuario
        res.status(200).json('¡El usuario ha sido eliminado!'); // Devolver una respuesta de éxito
    } catch (error) {
        next(error); // Manejar cualquier error que ocurra durante la eliminación del usuario
    }
};

// Función para obtener los anuncios de un usuario
export const getUserListings = async (req, res, next) => {
    if (req.user.id === req.params.id) {
        try {
            const listings = await Listing.find({ userRef: req.params.id }); // Buscar los anuncios del usuario por su ID
            res.status(200).json(listings); // Devolver la lista de anuncios encontrados como respuesta
        } catch (error) {
            next(error); // Manejar cualquier error que ocurra durante la búsqueda de los anuncios del usuario
        }
    } else {
        return next(errorHandler(401, 'Solo puedes ver tus propios anuncios')); // Si no es el propietario, devolver un error de autorización
    }
};

// Función para obtener la información de un usuario por su ID
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id); // Buscar al usuario por su ID

        if (!user) return next(errorHandler(404, 'Usuario no encontrado'));

        const { password: pass, ...rest } = user._doc; // Excluir el campo de contraseña de la respuesta

        res.status(200).json(rest); // Devolver la información del usuario encontrada como respuesta
    } catch (error) {
        next(error); // Manejar cualquier error que ocurra durante la obtención de la información del usuario
    }
}
