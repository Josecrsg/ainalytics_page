// DataAnalysisPage.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function DataServices() {
  return (
    <div className='py-20 px-4 max-w-7xl mx-auto space-y-12'>
      {/* Encabezado de la página */}
      <section className='text-center'>
        <h1 className='text-5xl font-bold mb-6 text-slate-800'>Profundiza en el Análisis de Datos</h1>
        <p className='text-xl text-slate-700'>Convierte grandes datos en decisiones inteligentes y estratégicas.</p>
      </section>

      {/* Características */}
      <section className='grid grid-cols-1 md:grid-cols-3 gap-4 text-center'>
        <div className='border border-slate-200 p-6 rounded-lg'>
          <h2 className='text-lg font-semibold text-slate-800 mb-2'>Intuición de Datos</h2>
          <p className='text-slate-600'>Extraemos la esencia de tus datos para ofrecer perspectivas claras y aplicables.</p>
        </div>
        <div className='border border-slate-200 p-6 rounded-lg'>
          <h2 className='text-lg font-semibold text-slate-800 mb-2'>Análisis Predictivo</h2>
          <p className='text-slate-600'>Utilizamos modelos estadísticos para predecir futuras tendencias y comportamientos.</p>
        </div>
        <div className='border border-slate-200 p-6 rounded-lg'>
          <h2 className='text-lg font-semibold text-slate-800 mb-2'>Visualización de Datos</h2>
          <p className='text-slate-600'>Transformamos números complejos en visualizaciones claras y atractivas.</p>
        </div>
      </section>

      {/* Descripción detallada */}
      <section>
        <h2 className='text-3xl font-bold text-slate-800 mb-4 text-center'>Descubre lo que el Análisis de Datos Puede Hacer por Ti</h2>
        <p className='text-slate-700 mb-4 text-center'>
          En AInalitycsBI, combinamos la experiencia en negocios con la ciencia de datos para ofrecerte análisis de alta calidad que impulsan el crecimiento. No importa la complejidad de tus datos; nuestro equipo está aquí para desglosarlos en estrategias ganadoras.
        </p>
        <p className='text-slate-700 mb-4 text-center'>
          Desde análisis descriptivos hasta modelos prescriptivos, te ayudamos a navegar por el paisaje de los datos con confianza.
        </p>
      </section>

      {/* Sección de Testimonios */}
      <section className='bg-slate-100 py-8 px-6 rounded-lg'>
        <h2 className='text-3xl font-bold text-slate-800 mb-6 text-center'>Historias de Éxito</h2>
        <div className='space-y-4 text-center'>
          <blockquote className='italic text-slate-600'>"La claridad y precisión de los análisis de AInalitycsBI han sido fundamentales para nuestra estrategia de crecimiento." - CEO de Empresa Líder</blockquote>
          <blockquote className='italic text-slate-600'>"Con su ayuda, hemos podido identificar nuevas oportunidades de mercado y aumentar nuestro rendimiento." - Director de Marketing</blockquote>
        </div>
      </section>

      {/* Llamada a la acción */}
      <section className='text-center'>
        <h2 className='text-3xl font-bold text-slate-800 mb-4 '>Empieza a Transformar Datos en Decisión</h2>
        <p className='mb-6 text-slate-700'>Conéctate con nosotros y comienza el viaje hacia un análisis de datos que impulsa el éxito.</p>
        <Link to='/contact'>
          <button className='bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition duration-300'>Contáctanos</button>
        </Link>
      </section>
    </div>
  );
}
``
