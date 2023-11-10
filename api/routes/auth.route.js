// Importar el módulo express para definir rutas y controladores de autenticación
import express from 'express';
import { signup, signin, google, signout } from '../controllers/auth.controller.js'; // Importar las funciones de controladores de autenticación

// Crear un enrutador para gestionar las rutas relacionadas con la autenticación
const router = express.Router();

// Definir una ruta para el registro de usuarios utilizando el controlador "signup"
router.post('/signup', signup);

// Definir una ruta para el inicio de sesión de usuarios utilizando el controlador "signin"
router.post('/signin', signin);

// Definir una ruta para el inicio de sesión de usuarios mediante Google utilizando el controlador "google"
router.post('/google', google);

// Definir una ruta para cerrar sesión de usuarios utilizando el controlador "signout"
router.get('/signout', signout);

// Exportar el enrutador para su uso en otras partes de la aplicación
export default router;
