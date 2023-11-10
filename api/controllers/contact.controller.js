// controllers/contact.controller.js
import ContactMessage from "../models/contactMessage.model.js";
import { errorHandler } from "../utils/errors.js";
import { validationResult, body } from 'express-validator';

// Validaciones para el mensaje de contacto
export const validateContactMessage = [
  body('name').trim().isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres.'),
  body('email').isEmail().withMessage('Por favor, introduce un correo electrónico válido.'),
  body('message').trim().isLength({ min: 10 }).withMessage('El mensaje debe tener al menos 10 caracteres.'),
];

// Controlador para enviar un mensaje de contacto
export const sendContactMessage = async (req, res, next) => {
  // Verificamos los resultados de la validación
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Usamos el método create para simplificar la creación y el guardado en la base de datos.
    const savedMessage = await ContactMessage.create(req.body);

    res.status(200).json({ 
      message: 'Mensaje enviado con éxito.',
      data: savedMessage
    });
  } catch (error) {
    // errorHandler es una función de utilidad que debes definir para manejar errores de forma consistente.
    next(errorHandler(500, 'Error al enviar el mensaje.'));
  }
};


