import React from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'; // Importar Firebase Auth
import { app } from '../firebase'; // Importar la instancia de Firebase
import { useDispatch } from 'react-redux'; // Importar useDispatch de Redux
import { signInSuccess } from '../redux/user/userSlice'; // Importar la acción de Redux para el inicio de sesión
import { useNavigate } from 'react-router-dom'; // Importar el hook de navegación de React Router

export default function OAuth() {
  const dispatch = useDispatch(); // Obtener la función de despacho de acciones de Redux
  const navigate = useNavigate(); // Obtener la función de navegación de React Router

  const handleGoogleClick = async () => {
    try {
      // Crear un proveedor de autenticación de Google
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app); // Obtener la instancia de autenticación de Firebase

      // Iniciar sesión con Google a través de un popup
      const result = await signInWithPopup(auth, provider);

      // Enviar la información del usuario autenticado al servidor
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      // Obtener la respuesta del servidor y despachar la acción de inicio de sesión exitoso en Redux
      const data = await res.json();
      dispatch(signInSuccess(data));

      // Redirigir al usuario a la página de inicio después de iniciar sesión con éxito
      navigate('/');
    } catch (error) {
      console.log('No se pudo iniciar sesión con Google', error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type='button'
      className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
    >
      Accede con Google
    </button>
  );
}
