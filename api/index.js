// Importar los módulos necesarios
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import contactRouter from './routes/contact.routes.js';
import path from 'path';

// Cargar las variables de entorno desde un archivo .env
dotenv.config();

// Conectar a la base de datos MongoDB
mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log('Conectado a MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });

    //Crear un static folder
    const __dirname = path.resolve();

// Crear una instancia de la aplicación Express
const app = express();

// Configurar middleware para el análisis de JSON en las solicitudes
app.use(express.json());

// Configurar middleware para el análisis de cookies en las solicitudes
app.use(cookieParser());

// Iniciar el servidor Express y escuchar en el puerto 3000
app.listen(3000, () => {
    console.log('El servidor está funcionando en el puerto 3000!!!!');
});

// Definir rutas para las diferentes partes de la aplicación
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);
app.use('/api/contact', contactRouter);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  })

/**Aquí se está creando un middleware para gestionar los errores */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Error interno del servidor';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
