// src/App.jsx
import React from 'react';
import './App.css';
import Usuarios from './Componets/Usuarios/Usuarios'; // Asegúrate de que la ruta sea correcta

function App() {
  return (
    <>
      <h2>Bienvenido a la Aplicación</h2>
      <Usuarios /> {/* Muestra el componente de usuarios */}
    </>
  );
}

export default App;
