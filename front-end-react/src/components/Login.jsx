import { useState } from "react";
import React from 'react';
import "../../../../front-end-shared/css/Login/Login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { BACKEND_URL } from "../consts";

export function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["username, token"]);

  const handleLogin = async () => {
    const url = BACKEND_URL + "/login";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await response.json();
    if (data.success === true) {
      // setCookie("token", data.token, { path: "/" }); <-- Implement the token response from the backend
      setCookie("token", "valid", { path: "/" });
      setCookie("username", username, { path: "/" });
      //navigate("/home");
      useNavigate("/home");
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  //
  const handleGuestGame = () => {
    setCookie("token", "valid", { path: "/" });
    setCookie("username", "anonymous", { path: "/", maxAge: 3600 });
  };

  return (
    <>
      <div className="parent">
        <div className="container">
          <h1 className="inicia-sesion">Inicia sesión</h1>
          <div className="loginForm">
            <p className="p-login-account">Nombre de usuario</p>
            <input
              type="text"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <p className="p-login-account">Contraseña</p>
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="login-button" onClick={handleLogin}>
            Iniciar sesión
          </button>
        </div>
        <div>
          <Link to="/createUser" className="login-link">
            No tengo cuenta...
          </Link>
          <Link to="/game" className="login-link" onClick={handleGuestGame}>
            Jugar como invitado
          </Link>
        </div>
      </div>
    </>
  );
}
