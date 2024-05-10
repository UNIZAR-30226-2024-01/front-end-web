import '../../../../../front-end-shared/css/Home/NavbarHome.css';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import React from 'react';
export function NavbarHome() {
  const [isOpen, setIsOpen] = useState(false);
  const [, , removeCookie] = useCookies(['token']);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleConfig = () => {
    navigate('/settings');
  };

  const handleLogout = () => {
    // Remove the token cookie
    removeCookie('token', { path: '/' });
    removeCookie('username', { path: '/' });
    removeCookie('partida_actual', { path: '/' });

    // Navigate to the login page
    navigate('/login');
  };

  return (
    <nav className="navbar-home">
      <div className={`burger`} onClick={toggleMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </div>

      {isOpen && (
        <div className="menu">
          <p onClick={handleConfig}>Configuración</p>
          <p onClick={handleLogout}>Cerrar sesión</p>
        </div>
      )}
    </nav>
  );
}
