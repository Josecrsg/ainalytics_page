// Importar el módulo mongoose para definir un esquema y modelo de datos
import mongoose from 'mongoose';

// Definir un esquema para los mensajes de contacto
const contactMessageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // El nombre es un campo obligatorio
    },
    email: {
        type: String,
        required: true, // El correo electrónico es un campo obligatorio
        match: [/.+@.+\..+/, 'Por favor, ingresa una dirección de correo electrónico válida'], // Validar el formato del correo electrónico
    },
    message: {
        type: String,
        required: true, // El mensaje es un campo obligatorio
    },
}, {
    timestamps: true, // Agregar marcas de tiempo para el registro de la fecha de creación y actualización
    collection: 'contact_messages', // Especificar el nombre de la colección en la base de datos
});

// Crear un modelo de datos llamado "ContactMessage" basado en el esquema definido
const ContactMessage = mongoose.model('contact', contactMessageSchema);

// Exportar el modelo de datos "ContactMessage" para su uso en otras partes de la aplicación
export default ContactMessage;
