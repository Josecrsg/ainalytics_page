// Importando el modelo "User" desde el archivo "user.model.js".
import User from "../models/user.model.js"

// Importando la librería "bcryptjs" para la hasheación de contraseñas.
import bcryptjs from "bcryptjs"

// Importando el "errorHandler" desde "errors.js" para manejar errores.
import {errorHandler} from '../utils/errors.js'

// Importando la librería "jsonwebtoken" para la generación y validación de JWT.
import jwt from 'jsonwebtoken'


// Función asíncrona para registrar un nuevo usuario.
export const signup = async (req, res, next) =>{
    // Extrayendo datos del cuerpo de la solicitud.
    const { username, email, password} = req.body;

    // Hasheando la contraseña proporcionada.
    const hashedPassword = bcryptjs.hashSync(password, 10)

    // Creando una nueva instancia del modelo "User".
    const newUser = new User({username, email, password: hashedPassword});

    // Intentando guardar el nuevo usuario en la base de datos.
    try{
        await newUser.save()
        res.status(201).json('User created successfully')
    }
    catch(error){
        // En caso de error, pasamos al siguiente middleware con el error.
        next(error)
    }
};

// Función asíncrona para iniciar sesión.
export const signin = async (req, res, next) =>{
    // Extrayendo email y contraseña del cuerpo de la solicitud.
    const {email, password} = req.body;

    try {
        // Intentando encontrar al usuario en la base de datos por email.
        const validUser = await User.findOne({email});

        // Si no se encuentra el usuario, se devuelve un error 401.
        if (!validUser) return next(errorHandler(401, 'User not found'))

        // Comparando la contraseña proporcionada con la hasheada en la base de datos.
        const validPassword = bcryptjs.compareSync(password, validUser.password)

        // Si la contraseña no es válida, se devuelve un error 401.
        if(!validPassword) return next(errorHandler(401, 'Wrong credentials!'))

        // Generando un token JWT con la ID del usuario.
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)

        /**
         * Con la siguiente línea, desestructuramos el objeto "validUser._doc"
         * para excluir la información de la contraseña.
         */
        const {password: pass, ...rest} = validUser._doc;

        // Estableciendo la cookie 'access_token' y enviando la respuesta.
        res.cookie('access_token', token, {htppOnly: true}).status(200).json(rest)
    } catch (error) {
        // En caso de error, pasamos al siguiente middleware con el error.
        next(error)
    }
}

export const google = async (req, res, next) =>{
    try {
        const user = await User.findOne({email: req.body.email})
        if(user){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
            const {password: pass, ...rest} = user._doc
            res
                .cookie('access_token', token, {httpOnly: true})
                .status(200)
                .json(rest)
        }else{
            const generatedPAssword = Math.random().toString(36).slice(-8)
            const hashedPassword = bcryptjs.hashSync(generatedPAssword, 10)
            const newUser = new User({username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4), email: req.body.email, 
            password: hashedPassword, avatar: req.body.photo})
            await newUser.save()
            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET)
            const {password: pass, ...rest} = newUser._doc
            res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest)                    
        }      
        
    } catch (error) {
        next(error)
    }
}

export const signout = async (req, res, next)=>{
    try {
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out!')
    } catch (error) {
        next(error)
    }

}