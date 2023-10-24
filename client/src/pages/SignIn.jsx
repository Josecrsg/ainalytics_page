// Importa las dependencias necesarias de React y otras bibliotecas.
import React, { useState } from 'react'  // Importa React y el hook useState para manejar estados.
import {Link, useNavigate} from 'react-router-dom' // Importa el componente Link y el hook useNavigate de react-router-dom.
import { useDispatch, useSelector } from 'react-redux' // Importa los hooks useDispatch y useSelector de react-redux.
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice' // Importa las acciones del slice de usuario.

// Declara el componente funcional SignUp.
export default function SignUp() {

  // Inicializa el estado formData como un objeto vacío.
  const [formData, setFormData] = useState({}) // Hook para gestionar el estado del formulario.
  
  // Utiliza el hook useSelector para acceder al estado del usuario en Redux.
  const {loading, error} = useSelector((state) => state.user) // Obtiene loading y error del estado de usuario.
  
  // Inicializa navigate utilizando el hook useNavigate.
  const navigate = useNavigate() // Permite navegar programáticamente a diferentes rutas.
  
  // Inicializa dispatch utilizando el hook useDispatch.
  const dispatch = useDispatch() // Permite despachar acciones a Redux.

  // Declara la función handleChange para manejar los cambios en los inputs del formulario.
  const handleChange = (e) =>{
    setFormData({
      ...formData, // Propaga el estado actual de formData.
      [e.target.id]: e.target.value // Actualiza el valor de un campo específico basado en el id del elemento.
    })
  };

  // Declara la función handleSubmit para manejar el envío del formulario.
  const handleSubmit = async (e)=>{
    e.preventDefault(); // Evita que el formulario realice la acción predeterminada de enviar/recargar.
    
    try{
      dispatch(signInStart()) // Despacha la acción signInStart a Redux.
      
      // Realiza una solicitud POST a la API de autenticación.
      const res = await fetch('api/auth/signin',
      {
        method: 'POST', // Método POST.
        headers:{
          'Content-Type': 'application/json' // Establece el tipo de contenido a JSON.
        },
        body: JSON.stringify(formData), // Convierte el formData a JSON.
      })
      const data = await res.json() // Convierte la respuesta a JSON.
      console.log(data) // Imprime la data en consola.
      
      // Si la respuesta no es exitosa, despacha la acción signInFailure con el mensaje de error.
      if(data.success === false){
        dispatch(signInFailure(data.message))
        return
      }
      
      // Si la respuesta es exitosa, despacha la acción signInSuccess con la data y redirige al usuario a la página principal.
      dispatch(signInSuccess(data))
      navigate('/')
    }
    // En caso de que se produzca un error en el bloque try, se captura y se despacha la acción signInFailure con el mensaje de error.
    catch(error){
      dispatch(signInFailure(error.message))
    }
  }

  // Retorna el JSX para renderizar el componente.
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>        
        Sign In {/** Título del formulario */}
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        {/** Formulario con un evento de envío y estilos */}
        <input type="text"  
                placeholder='email' 
                className='border p-3 rounded-lg' 
                id='email'
                onChange={handleChange}
                /> {/** Input para el email */}
        <input type="password"  
                placeholder='password' 
                className='border p-3 rounded-lg' 
                id='password'
                onChange={handleChange}
                /> {/** Input para la contraseña */}
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign In'} {/** Si loading es verdadero, muestra "Loading...", de lo contrario muestra "Sign In" */}
        </button>
      </form>
      <div className='flex gap-2 mt-5 '>
        <p>Dont have an account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>Sign Up</span> {/** Componente Link que redirige al usuario a la página de registro. Texto del enlace */}
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>} {/** Si hay un error, muestra el mensaje de error */}
    </div>
  )
}