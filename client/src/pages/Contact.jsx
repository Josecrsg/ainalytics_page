import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitCount, setSubmitCount] = useState(0); // Nuevo estado para contar los envíos

  // Manejador para los cambios en los campos del formulario.
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica si ya se han realizado 3 envíos
    if (submitCount >= 3) {
      setErrorMessage('Has alcanzado el límite máximo de envíos de mensajes.');
      return;
    }

    // Intenta enviar el formulario
    try {
      const response = await fetch('/api/contact/contact', { // Asegúrate de que esta URL es la correcta
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setSuccessMessage('Mensaje enviado con éxito!');
      setSubmitCount(submitCount + 1); // Incrementa el contador de envíos
    } catch (error) {
      console.error('Hubo un error al enviar el mensaje:', error);
      setErrorMessage('Hubo un error al enviar el mensaje.');
    }
  };

  return (

    <div className='bg-gray-100 py-10 px-5 lg:px-20'>
    {/* Sección del Encabezado */}
    <div className='text-center mb-10'>
      <h1 className='text-4xl font-bold text-gray-800 mb-4'>Contacta con AInalitycsBI</h1>
      <p className='text-gray-600'>
        ¿Tienes una consulta o necesitas ayuda con tus proyectos de ciencia de datos? Contacta con nosotros y te asistiremos con soluciones personalizadas.
      </p>
    </div>

    {/* Sección de Detalles de Contacto */}
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center mb-8'>
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <h2 className='text-xl font-semibold mb-2'>Dirección</h2>
        <p className='text-gray-600'>Avenida de la Ciencia, 10, 28006 Madrid, España</p>
      </div>
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <h2 className='text-xl font-semibold mb-2'>Teléfono</h2>
        <p className='text-gray-600'>+34 912 345 678</p>
      </div>
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <h2 className='text-xl font-semibold mb-2'>Email</h2>
        <p className='text-gray-600'>info@ainalitycsbi.com</p>
      </div>
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <h2 className='text-xl font-semibold mb-2'>Redes Sociales</h2>
        <p className='text-gray-600'>@ainalitycsbi</p>
      </div>
    </div>

    <div className='bg-gray-100 py-10 px-5 lg:px-20'>
      {/* Resto del código... */}
      
      <div className='bg-white p-6 rounded-lg shadow-md mb-8'>
        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
            <input
              type='text'
              placeholder='Nombre'
              className='border p-2 rounded-lg'
              name='name'
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type='email'
              placeholder='Email'
              className='border p-2 rounded-lg'
              name='email'
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <textarea
            placeholder='Mensaje'
            className='border p-2 rounded-lg w-full mb-4'
            name='message'
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <button type='submit' className='bg-blue-600 text-white p-3 rounded-lg w-full'>
            Enviar Mensaje
          </button>
        </form>
        {/* Mensajes de éxito y error */}
        {successMessage && <div className="text-green-500">{successMessage}</div>}
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      </div>
    </div>
    </div>
  );
}
