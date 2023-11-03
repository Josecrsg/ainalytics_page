import express from 'express'
import { deleteUser, test, updateUser, getUserListings} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router()

/**
 * Esto se agrega dentro del archivo  user.controller ya que en este archivo solo estaran las rutas
 * 
 * router.get('/test', (req, res)=>{
    res.send('Hello world')
});*/

router.get('/test', test)
router.post('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)
router.get('/listings/:id', verifyToken, getUserListings)

export default router;