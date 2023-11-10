// routes/contact.routes.js
import express from 'express';
import { sendContactMessage, validateContactMessage } from '../controllers/contact.controller.js';

const router = express.Router();

router.post('/contact', validateContactMessage, sendContactMessage);

export default router;
