import { useState } from 'react';
import '../../../../front-end-shared/css/Login/Login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import React from 'react';
import { BACKEND_URL } from '../consts';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [, setCookie] = useCookies(['username, token']);

  const handleLogin = async () => {
    const url = BACKEND_URL + '/login';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await response.json();
    if (data.exito === true) {
      setCookie('token', 'valid', { path: '/' });
      setCookie('username', username, { path: '/' });
      setCookie('partida_actual', { partida: data.id_partida_actual }, {path: '/',});
      navigate('/');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <>
      <div className="login-body">
        <div className="login-container">
          <h1 className="inicia-sesion">Inicia sesión</h1>
          <div className="loginForm">
            <p className="p-login-account">Nombre de usuario</p>
            <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
            <p className="p-login-account">Contraseña</p>
            <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className="login-button" onClick={handleLogin}>
            Iniciar sesión
          </button>
        </div>
        <div>
          <Link to="/createUser" className="login-link">
            No tengo cuenta...
          </Link>
        </div>
        <a target="_blank" href="https://github.com/UNIZAR-30226-2024-01" className="logo-to-github">
          <img src="/logo-no-back.png" alt="logo de la app" />
        </a>
      </div>
    </>
  );
}
