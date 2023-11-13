import React from 'react';
import {Link} from 'react-router-dom';

export default function Inicio() {
  return (
    <div className='py-20 px-4 max-w-7xl mx-auto text-center'>
      {/* Sección Hero */}
      <section className='text-center mb-12'>
        <h1 className='text-5xl font-bold mb-6 text-slate-800'>Liderando la Revolución de los Datos</h1>
        <p className='text-xl mb-6 text-slate-700'>Aprovecha el poder de los datos con análisis avanzados e insights transformadores.</p>
        <Link to='/services'>
        <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300'>Explora Nuestros Servicios</button>
        </Link>
      </section>

      {/* Sección de Servicios */}
      <section className='mb-12'>
        <h2 className='text-3xl font-bold mb-6 text-slate-800'>Nuestros Servicios</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='p-4 border border-slate-200 rounded'>
            <h3 className='text-xl font-semibold mb-2'>Análisis de Datos</h3>
            <p>Descubre insights con nuestras soluciones integrales de análisis de datos que informan decisiones empresariales estratégicas.</p>
          </div>
          <div className='p-4 border border-slate-200 rounded'>
            <h3 className='text-xl font-semibold mb-2'>Aprendizaje Automático</h3>
            <p>Empodera tu negocio con modelos de aprendizaje automático que predicen, automatizan y optimizan tus operaciones.</p>
          </div>
          <div className='p-4 border border-slate-200 rounded'>
            <h3 className='text-xl font-semibold mb-2'>Inteligencia de Negocios</h3>
            <p>Toma decisiones basadas en datos con nuestros servicios de inteligencia empresarial para mantener la ventaja competitiva.</p>
          </div>
        </div>
      </section>

      {/* Sección Sobre Nosotros */}
      <section className='mb-12'>
        <h2 className='text-3xl font-bold mb-4 text-slate-800'>Sobre Nosotros</h2>
        <p className='mb-4 text-slate-700'>
          Somos un equipo de científicos y analistas de datos comprometidos con convertir datos en insights accionables y conocimiento estratégico.
        </p>
        <p className='mb-4 text-slate-700'>
          Nuestra misión es empoderar tu negocio con las herramientas y conocimientos necesarios para prosperar en la era digital.
        </p>
      </section>

      {/* Sección de Testimonios */}
      <section className='mb-12'>
        <h2 className='text-3xl font-bold mb-6 text-slate-800'>Lo que Dicen Nuestros Clientes</h2>
        <div className='space-y-4'>
          <blockquote className='italic text-slate-600'>"AInalitycsBI ha transformado cómo manejamos nuestros datos. ¡Su experiencia ha sido invaluable para darnos una ventaja competitiva!" - Cliente Satisfecho</blockquote>
          <blockquote className='italic text-slate-600'>"Los modelos predictivos y el análisis de AInalitycsBI han sido un cambio radical para nuestra estrategia de ventas." - Consumidor Contento</blockquote>
        </div>
      </section>

      {/* Llamada a la Acción */}
      <section className='text-center'>
        <h2 className='text-3xl font-bold mb-6 text-slate-800'>¿Listo para Desbloquear el Potencial de Tus Datos?</h2>
        <p className='mb-6 text-slate-700'>Contáctanos hoy y convierte tus datos en tu activo más valioso.</p>
        <Link to='/contact'>
        <button className='bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition duration-300'>Comenzar</button>
        </Link>
      </section>
    </div>
  )
}
