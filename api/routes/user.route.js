import express from 'express'
import { test } from '../controllers/user.controller.js';

const router = express.Router()

/**
 * Esto se agrega dentro del archivo  user.controller ya que en este archivo solo estaran las rutas
 * 
 * router.get('/test', (req, res)=>{
    res.send('Hello world')
});*/

router.get('/test', test)

export default router;