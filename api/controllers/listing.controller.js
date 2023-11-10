import Listing from "../models/listing.model.js"; // Importar el modelo Listing
import { errorHandler } from "../utils/errors.js"; // Importar una utilidad de manejo de errores

// Definir una función para crear un nuevo anuncio
export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body); // Crear un nuevo anuncio con los datos del cuerpo de la solicitud
        return res.status(200).json(listing); // Devolver el anuncio creado como respuesta
    } catch (error) {
        next(error); // Manejar cualquier error que ocurra durante la creación del anuncio
    }
}

// Definir una función para eliminar un anuncio
export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id); // Buscar un anuncio por su ID

    if (!listing) {
        return next(errorHandler(404, 'Anuncio no encontrado')); // Si no se encuentra el anuncio, devolver un error
    }

    if (req.user.id.toString() !== listing.userRef.toString()) { // Comprobar si el usuario autenticado es el propietario del anuncio
        return next(errorHandler(401, 'Solo puedes eliminar tus propios anuncios.')); // Si no es el propietario, devolver un error de autorización
    }

    try {
        await Listing.findByIdAndDelete(req.params.id); // Eliminar el anuncio por su ID
        res.status(200).json('El anuncio ha sido eliminado'); // Devolver una respuesta de éxito
    } catch (error) {
        next(error); // Manejar cualquier error que ocurra durante la eliminación del anuncio
    }
}

// Definir una función para actualizar un anuncio
export const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id); // Buscar un anuncio por su ID

    if (!listing) {
        return next(errorHandler(404, 'Anuncio no encontrado')); // Si no se encuentra el anuncio, devolver un error
    }

    if (req.user.id.toString() !== listing.userRef.toString()) { // Comprobar si el usuario autenticado es el propietario del anuncio
        return next(errorHandler(401, 'Solo puedes actualizar tus propios anuncios.')); // Si no es el propietario, devolver un error de autorización
    }

    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ); // Actualizar el anuncio por su ID con los datos proporcionados en el cuerpo de la solicitud

        res.status(200).json(updatedListing); // Devolver el anuncio actualizado como respuesta
    } catch (error) {
        next(error); // Manejar cualquier error que ocurra durante la actualización del anuncio
    }
}

// Definir una función para obtener un anuncio por su ID
export const getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id); // Buscar un anuncio por su ID

        if (!listing) {
            return next(errorHandler(404, 'Anuncio no encontrado')); // Si no se encuentra el anuncio, devolver un error
        }

        res.status(200).json(listing); // Devolver el anuncio encontrado como respuesta
    } catch (error) {
        next(error); // Manejar cualquier error que ocurra durante la obtención del anuncio
    }
}

// Definir una función para obtener una lista de anuncios con filtros y opciones de paginación
export const getListings = async (req, res, next) => {
    try {
        // Configurar filtros y opciones de búsqueda
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        let offer = req.query.offer;

        if (offer === undefined || offer === 'false') {
            offer = { $in: [false, true] };
        }

        let furnished = req.query.furnished;

        if (furnished === undefined || furnished === 'false') {
            furnished = { $in: [false, true] };
        }

        let parking = req.query.parking;

        if (parking === undefined || parking === 'false') {
            parking = { $in: [false, true] };
        }

        let type = req.query.type;

        if (type === undefined || type === 'all') {
            type = { $in: ['sale', 'rent'] };
        }

        const searchTerm = req.query.searchTerm || '';

        const sort = req.query.sort || 'createdAt';

        const order = req.query.order || 'desc';

        // Realizar la búsqueda de anuncios con los filtros y opciones proporcionados
        const listings = await Listing.find({
            name: { $regex: searchTerm, $options: 'i' },
            offer,
            furnished,
            parking,
            type,
        })
            .sort({ [sort]: order })
            .limit(limit)
            .skip(startIndex);

        return res.status(200).json(listings); // Devolver la lista de anuncios encontrados como respuesta
    } catch (error) {
        next(error); // Manejar cualquier error que ocurra durante la búsqueda de anuncios
    }
};
