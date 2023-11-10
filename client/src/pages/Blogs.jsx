import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Blogs() {
  const [offerListings, setOfferListings] = useState([]); // Estado para almacenar listados de ofertas
  const [saleListings, setSaleListings] = useState([]); // Estado para almacenar listados de ventas
  const [rentListings, setRentListings] = useState([]); // Estado para almacenar listados de alquiler
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings(); // Llamar a la función para cargar listados de alquiler
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings(); // Llamar a la función para cargar listados de ventas
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error); // Debería ser console.log en lugar de log
      }
    };

    fetchOfferListings(); // Llamar a la función para cargar listados de ofertas al montar el componente
  }, []);

  return (
    <div className="grid place-items-center h-screen">
      {/* Sección superior */}
      <div className='flex flex-col gap-3 p-8 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl text-center'>
          Disfruta de los mejores <span className='text-slate-500'>Blogs</span>
          <br />
          para mantenerte al día
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm text-center w-full'>
          En tan solo 5 minutos podrás mantenerte al día
          <br />
          de las últimas noticias en tecnología y ciencia.
        </div>        
      </div>
            
      <div className='max-w-6xl mx-auto p-0 flex flex-col gap-0 my-0 items-center'>
        {/* Listados de alquiler */}
        {rentListings && rentListings.length > 0 && (
          <div className='w-full'>
            <div className='my-0'>
              <h2 className='text-2xl font-semibold text-slate-600 text-center'>Blogs</h2>
              <div className='text-center'>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=all'}>Mostrar más blogs</Link>
              </div>
            </div>
            <div className='flex flex-wrap gap-4 justify-center'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
