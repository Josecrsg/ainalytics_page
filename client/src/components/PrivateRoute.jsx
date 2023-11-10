import React from 'react';
import { useSelector } from 'react-redux'; // Importar useSelector de Redux para obtener el estado
import { Outlet, Navigate } from 'react-router-dom'; // Importar Outlet y Navigate de React Router para el enrutamiento

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user); // Obtener el estado actual del usuario desde Redux

  // Renderizar el componente Outlet si el usuario está autenticado, de lo contrario, redirigir al inicio de sesión
  return currentUser ? <Outlet /> : <Navigate to='/sign-in' />;
}
