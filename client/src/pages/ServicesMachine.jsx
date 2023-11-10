// MachineLearningPage.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function MachineServices() {
  return (
    <div className='py-20 px-4 max-w-7xl mx-auto space-y-12'>
      {/* Encabezado de la página */}
      <section className='text-center'>
        <h1 className='text-5xl font-bold mb-6 text-slate-800'>Explora el Futuro con Machine Learning</h1>
        <p className='text-xl text-slate-700'>Implementa soluciones inteligentes que aprenden y evolucionan con tu empresa.</p>
      </section>

      {/* Características */}
      <section className='grid grid-cols-1 md:grid-cols-3 gap-4 text-center'>
        <div className='border border-slate-200 p-6 rounded-lg'>
          <h2 className='text-lg font-semibold text-slate-800 mb-2'>Automatización Avanzada</h2>
          <p className='text-slate-600'>Reduce la carga de trabajo y mejora la eficiencia con algoritmos que automatizan tareas complejas.</p>
        </div>
        <div className='border border-slate-200 p-6 rounded-lg'>
          <h2 className='text-lg font-semibold text-slate-800 mb-2'>Predicciones Precisas</h2>
          <p className='text-slate-600'>Nuestros modelos predictivos ofrecen perspectivas que ayudan a anticipar las necesidades del mercado y las tendencias del consumidor.</p>
        </div>
        <div className='border border-slate-200 p-6 rounded-lg'>
          <h2 className='text-lg font-semibold text-slate-800 mb-2'>Procesamiento del Lenguaje Natural</h2>
          <p className='text-slate-600'>Interactúa de manera más natural con tus clientes mediante chatbots y asistentes virtuales que entienden y procesan el lenguaje humano.</p>
        </div>
      </section>

      {/* Descripción detallada */}
      <section>
        <h2 className='text-3xl font-bold text-slate-800 mb-4 text-center'>Potencia Tu Empresa con Machine Learning</h2>
        <p className='text-slate-700 mb-4 text-center'>
          En AInalitycsBI, estamos a la vanguardia de la innovación en machine learning. Nuestros expertos utilizan las técnicas más avanzadas para crear soluciones que se adaptan y mejoran continuamente.
        </p>
        <p className='text-slate-700 mb-4 text-center'>
          Desde la optimización de la cadena de suministro hasta personalización del cliente, nuestras soluciones están diseñadas para darte una ventaja competitiva sostenible.
        </p>
      </section>

      {/* Sección de Testimonios */}
      <section className='bg-slate-100 py-8 px-6 rounded-lg'>
        <h2 className='text-3xl font-bold text-slate-800 mb-6 text-center'>Casos de Éxito</h2>
        <div className='space-y-4'>
          <blockquote className='italic text-slate-600 text-center'>"El machine learning de AInalitycsBI nos ha ayudado a anticipar las tendencias del mercado con una precisión asombrosa." - Director de Innovación</blockquote>
          <blockquote className='italic text-slate-600 text-center'>"Gracias a AInalitycsBI, hemos automatizado procesos que antes consumían cientos de horas hombre." - Gerente de Operaciones</blockquote>
        </div>
      </section>

      {/* Llamada a la acción */}
      <section className='text-center'>
        <h2 className='text-3xl font-bold text-slate-800 mb-4'>Inicia la Transformación con Inteligencia Artificial</h2>
        <p className='mb-6 text-slate-700'>Descubre cómo nuestras soluciones de machine learning pueden ayudarte a superar tus desafíos empresariales.</p>
        <Link to='/about'>
          <button className='bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition duration-300'>Hablemos</button>
        </Link>
      </section>
    </div>
  );
}
