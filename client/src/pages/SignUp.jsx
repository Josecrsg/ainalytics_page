// Importando módulos necesarios de React y react-router-dom.
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Definición del componente SignUp.
export default function SignUp() {
  // Estado para manejar los datos del formulario.
  const [formData, setFormData] = useState({});
  // Estado para manejar los errores.
  const [error, setError] = useState(null);
  // Estado para indicar si está en proceso de carga/envío.
  const [loading, setLoading] = useState(false);
  // Hook para navegar entre rutas.
  const navigate = useNavigate();
  // Estado para controlar si la contraseña es visible o no.
  const [showPassword, setShowPassword] = useState(false);
  // Función que cambia el valor del estado showPassword (lo invierte de true a false y viceversa).
  const toggleShowPassword = () => {
      setShowPassword(!showPassword);
  };

  // Función que maneja el cambio en los inputs y actualiza el estado.
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  // Función que verifica que las contraseñas sean iguales.
  const arePasswordsEqual = () => {
    return formData.password === formData.confirmPassword;
  };

  // Función que se ejecuta al enviar el formulario.
  const handleSubmit = async (e) => {
    // Prevenir comportamiento por defecto del formulario.
    e.preventDefault();

    // Verificar si las contraseñas son iguales.
    if (!arePasswordsEqual()) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      // Indicar que se está enviando el formulario.
      setLoading(true);

      // Enviar datos del formulario a la API.
      const res = await fetch('api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      // Si hay un error en la respuesta, actualizar el estado.
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }

      // Si todo sale bien, resetear errores y navegar a sign-in.
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      // En caso de un error en el fetch, actualizar el estado.
      setLoading(false);
      setError(error.message);
    }
  };

  // JSX del componente.
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>
        Sign Up
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username' onChange={handleChange} />
        <input type="text" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange} />
        <div className="relative">
          <input type={showPassword ? "text" : "password"} placeholder='password' className='border p-3 rounded-lg w-full' id='password' onChange={handleChange} />
          <span className="absolute right-3 top-3 cursor-pointer" onClick={toggleShowPassword}>
            {showPassword ? 'Hide' : 'Show'}
          </span>
        </div>
        <div className="relative">
          <input type={showPassword ? "text" : "password"} placeholder='Confirm password' className='border p-3 rounded-lg w-full' id='confirmPassword' onChange={handleChange} />
          <span className="absolute right-3 top-3 cursor-pointer" onClick={toggleShowPassword}>
            {showPassword ? 'Hide' : 'Show'}
          </span>
        </div>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      <div className='flex gap-2 mt-5 '>
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign In</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}