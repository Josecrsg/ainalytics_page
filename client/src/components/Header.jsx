import { Link, useNavigate } from 'react-router-dom'; // Importar componentes de enrutamiento de React
import { useSelector } from 'react-redux'; // Importar el selector de Redux
import { useEffect, useState } from 'react'; // Importar los hooks de efecto y estado de React
import { FaSearch, FaBars } from 'react-icons/fa'

export default function Header() {
  const { currentUser } = useSelector((state) => state.user); // Obtener el estado actual del usuario desde Redux
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const navigate = useNavigate(); // Función de navegación de React Router
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  console.log(isMenuOpen)

  const renderLinks = () => (
    <>
      <Link to='/'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              Inicio
            </li>
          </Link>
          <Link to='/services'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              Servicios
            </li>
          </Link>
          <Link to='/blogs'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              Blogs
            </li>
          </Link>
          <Link to='/contact'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              Contacto
            </li>
          </Link>
          <Link to='/profile'>
            {currentUser ? (
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className=' text-slate-700 hover:underline'> Cuenta</li>
            )}
          </Link>
    </>
  );
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>AI</span>
            <span className='text-slate-700'>nalitycsBI</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className='bg-slate-100 p-3 rounded-lg flex items-center'
        >
          <input
            type='text'
            placeholder='Buscador de Blogs...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className='text-slate-600' />
          </button>
        </form>
        <ul className='flex gap-4'>
         {/* Botón del menú de hamburguesa */}
        <button className='sm:hidden' onClick={toggleMenu}>
          <FaBars className='text-slate-600' />
        </button>

        {/* Menú para dispositivos móviles */}
        <ul className={`absolute top-full left-0 bg-white w-full flex flex-col gap-2 sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          {renderLinks()}
        </ul>

        {/* Menú para dispositivos de escritorio */}
        <ul className='hidden sm:flex gap-4'>
          {renderLinks()}
        </ul>
        </ul>
      </div>
      
    </header>
  );
}
