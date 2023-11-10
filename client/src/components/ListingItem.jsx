import { Link } from 'react-router-dom';

// Función para generar el marcado HTML seguro a partir de la descripción
function createMarkup(description) {
  return { __html: description };
}

// Componente para representar un elemento de listado
export default function ListingItem({ listing }) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/listing/${listing._id}`}>
        {/* Imagen del listado */}
        <img
          src={listing.imageUrls[0]}
          alt='listing cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        {/* Contenedor de información del listado */}
        <div className='p-3 flex flex-col gap-2 w-full'>
          {/* Nombre del listado */}
          <p className='truncate text-lg font-semibold text-slate-700'>
            {listing.name}
          </p>
          {/* Descripción del listado (usando dangerouslySetInnerHTML para HTML seguro) */}
          <p className='text-sm text-gray-600 line-clamp-2'>
            <span dangerouslySetInnerHTML={createMarkup(listing.description)} />
          </p>
        </div>
      </Link>
    </div>
  );
}
