// Importar módulos y archivos necesarios
import User from "../models/user.model.js"; // Importar el modelo User
import bcryptjs from "bcryptjs"; // Importar bcryptjs para el hash de contraseñas
import { errorHandler } from '../utils/errors.js'; // Importar una utilidad de manejo de errores
import jwt from 'jsonwebtoken'; // Importar JSON Web Token para la autenticación

// Definir una función para el registro de usuarios
export const signup = async (req, res, next) => {
    // Desestructurar los datos relevantes del cuerpo de la solicitud
    const { username, email, password } = req.body;
    
    // Hash de la contraseña del usuario utilizando bcryptjs
    const hashedPassword = bcryptjs.hashSync(password, 10);
    
    // Crear una nueva instancia de User con los datos proporcionados
    const newUser = new User({ username, email, password: hashedPassword });
    
    try {
        // Guardar el nuevo usuario en la base de datos
        await newUser.save();
        res.status(201).json('Usuario creado exitosamente');
    } catch (error) {
        // Manejar cualquier error que ocurra durante la creación del usuario
        next(error);
    }
};

// Definir una función para el inicio de sesión de usuarios
export const signin = async (req, res, next) => {
    // Desestructurar el correo electrónico y la contraseña del cuerpo de la solicitud
    const { email, password } = req.body;

    try {
        // Buscar un usuario con el correo electrónico proporcionado en la base de datos
        const validUser = await User.findOne({ email });
        
        // Si no se encuentra ningún usuario, devolver un error
        if (!validUser) return next(errorHandler(401, 'Usuario no encontrado'));
        
        // Comparar la contraseña proporcionada con la contraseña hash almacenada en la base de datos
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        
        // Si la contraseña es inválida, devolver un error
        if (!validPassword) return next(errorHandler(401, 'Credenciales incorrectas'));
        
        // Generar un Token JSON Web (JWT) para la autenticación
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        
        // Excluir el campo de contraseña de la respuesta y configurar el token en una cookie
        const { password: pass, ...rest } = validUser._doc;
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
    } catch (error) {
        // Manejar cualquier error que ocurra durante el inicio de sesión
        next(error);
    }
};

// Definir una función para el inicio de sesión de usuarios mediante Google
export const google = async (req, res, next) => {
    try {
        // Comprobar si ya existe un usuario con el correo electrónico proporcionado en la base de datos
        const user = await User.findOne({ email: req.body.email });
        
        if (user) {
            // Si el usuario existe, generar un JWT y configurarlo en una cookie
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = user._doc;
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
        } else {
            // Si el usuario no existe, generar una contraseña aleatoria y crear un nuevo usuario
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo
            });
            await newUser.save();
            
            // Generar un JWT para el nuevo usuario y configurarlo en una cookie
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc;
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
        }
    } catch (error) {
        // Manejar cualquier error que ocurra durante el inicio de sesión con Google
        next(error);
    }
};

// Definir una función para el cierre de sesión de usuarios
export const signout = async (req, res, next) => {
    try {
        // Borrar la cookie de acceso para desconectar al usuario
        res.clearCookie('access_token');
        res.status(200).json('Usuario ha cerrado sesión correctamente');
    } catch (error) {
        // Manejar cualquier error que ocurra durante el cierre de sesión
        next(error);
    }
};
