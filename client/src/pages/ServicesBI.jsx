// BusinessIntelligencePage.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function ServicesBI() {
  return (
    <div className='py-20 px-4 max-w-7xl mx-auto space-y-12'>
      {/* Encabezado de la página */}
      <section className='text-center'>
        <h1 className='text-5xl font-bold mb-6 text-slate-800'>Transforma Datos en Decisiones Estratégicas</h1>
        <p className='text-xl text-slate-700'>Maximiza el valor de tus datos con inteligencia de negocios de vanguardia.</p>
      </section>

      {/* Características */}
      <section className='grid grid-cols-1 md:grid-cols-3 gap-4 text-center'>
        <div className='border border-slate-200 p-6 rounded-lg'>
          <h2 className='text-lg font-semibold text-slate-800 mb-2'>Dashboards Intuitivos</h2>
          <p className='text-slate-600'>Obtén una vista panorámica de tus métricas clave con paneles de control fáciles de entender y personalizar.</p>
        </div>
        <div className='border border-slate-200 p-6 rounded-lg'>
          <h2 className='text-lg font-semibold text-slate-800 mb-2'>Análisis en Tiempo Real</h2>
          <p className='text-slate-600'>Toma decisiones informadas con análisis de datos en tiempo real que te permiten mantener el ritmo de tu negocio.</p>
        </div>
        <div className='border border-slate-200 p-6 rounded-lg'>
          <h2 className='text-lg font-semibold text-slate-800 mb-2'>Informes Detallados</h2>
          <p className='text-slate-600'>Profundiza en tus datos con informes detallados que revelan tendencias, patrones y oportunidades.</p>
        </div>
      </section>

      {/* Descripción detallada */}
      <section>
        <h2 className='text-3xl font-bold text-slate-800 mb-4 text-center'>Convierte Datos Complejos en Estrategias Claras</h2>
        <p className='text-slate-700 mb-4'>
          Con AInalitycsBI, la inteligencia de negocios se convierte en una parte integral de tu proceso de toma de decisiones, proporcionando claridad y dirección a través de los datos.
        </p>
        <p className='text-slate-700 mb-4'>
          Nuestro enfoque personalizado garantiza que las soluciones de BI se ajusten a las necesidades únicas de tu empresa, permitiéndote avanzar con confianza y basado en datos.
        </p>
      </section>

      {/* Sección de Testimonios */}
      <section className='bg-slate-100 py-8 px-6 rounded-lg text-center'>
        <h2 className='text-3xl font-bold text-slate-800 mb-6 text-center'>Testimonios de Clientes</h2>
        <div className='space-y-4'>
          <blockquote className='italic text-slate-600'>"La inteligencia empresarial proporcionada por AInalitycsBI es un cambio de juego para nosotros. Los dashboards personalizados son increíbles." - CEO de Empresa Tecnológica</blockquote>
          <blockquote className='italic text-slate-600'>"Los informes y análisis en tiempo real nos han permitido responder rápidamente a las dinámicas del mercado." - Directora de Marketing</blockquote>
        </div>
      </section>

      {/* Llamada a la acción */}
      <section className='text-center'>
        <h2 className='text-3xl font-bold text-slate-800 mb-4'>Empieza a Navegar Tu Negocio con Datos</h2>
        <p className='mb-6 text-slate-700'>Únete a las empresas líderes que ya están tomando decisiones inteligentes con nuestras soluciones de Business Intelligence.</p>
        <Link to='/contact'>
          <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300'>Consigue una Demo</button>
        </Link>
      </section>
    </div>
  );
}
