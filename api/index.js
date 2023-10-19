import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
dotenv.config();


mongoose
    .connect(process.env.MONGO)
    .then(()=>{
        console.log('Connected to MongoDB')
    })
    .catch((err) =>{
        console.log(err)
    });

const app = express();

app.use(express.json())

app.listen(3000, ()=>{
    console.log('Server is running on port 3000!!!!')
}
);


/**Con esto se esta llamando a todas las rutas que hay dentro del archivo user.route
 * Lo primera variable es la ruta
 * La segunda variable es el path 
 * 
 * 
 */
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);


/**Aqui se esta creando en middleware para gestionar los errores */
app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});