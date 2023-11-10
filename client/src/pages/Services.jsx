import React from 'react';
import { Link } from 'react-router-dom';

export default function Services() {
  
  // ... resto del código existente ...

  const ServiceCard = ({ title, description, features, link, buttonText }) => (
    <div className='border rounded-lg shadow-lg overflow-hidden'>
      <h3 className='text-2xl font-bold text-white bg-blue-500 p-4'>{title}</h3>
      <div className='p-6'>
        <p className='mb-5'>{description}</p>
        <ul className='mb-5'>
          {features.map((feature, index) => (
            <li key={index} className='mb-3'>{feature}</li>
          ))}
        </ul>
        <Link to={link} className='inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300'>{buttonText}</Link>
      </div>
    </div>
  );

  const servicesInfo = [
    {
      title: 'Análisis de Datos',
      description: 'Sumérgete en el mar de datos y encuentra tesoros ocultos. Nuestros análisis desentrañan los secretos que impulsarán tu negocio hacia adelante.',
      features: [
        'Análisis descriptivo y diagnóstico',
        'Análisis predictivo y prescriptivo',
        'Segmentación y análisis de cohortes'
      ],
      link: '/DataServices',
      buttonText: 'Descubre Más'
    },
    // ... Añade más servicios aquí siguiendo el mismo patrón ...
    {
      title: 'Machine Learning',
      description: 'Anticipa el futuro y haz que las máquinas trabajen para ti. Nuestras soluciones aprenden de tus datos y mejoran con cada decisión.',
      features: [
        'Modelos de clasificación',
        'Sistemas de recomendación',
        'Procesamiento de lenguaje natural'
      ],
      link: '/machineservices',
      buttonText: 'Aprende Más'
    },
    {
      title: 'Business Intelligence',
      description: 'Transforma datos en decisiones. Convierte la información en acción con dashboards intuitivos y reportes detallados.',
      features: [
        'Reportes interactivos',
        'Dashboards a medida',
        'Análisis en tiempo real'
      ],
      link: '/biservices',
      buttonText: 'Evoluciona tu negocio'
    },
    // ... Más servicios ...
  ];

  const servicesSection = (
    <section className='my-20'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {servicesInfo.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </section>
  );

  return (
    <div className='py-20 px-4 max-w-7xl mx-auto text-center'>    
      {servicesSection}    
    </div>
  );
}
