import '../../../../front-end-shared/css/Page404.css';
import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export function Page404() {
  const location = useLocation();
  return (
    <>
      <div className="container-404">
        <h2>No se encontro {location.pathname}</h2>
        <Link to="/" className="styled-link-404">
          Volver
        </Link>
        <h1>404</h1>
      </div>
    </>
  );
}
