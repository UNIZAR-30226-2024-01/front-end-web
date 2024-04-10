import { useState } from "react";
import "../../../../front-end-shared/css/Login/CreateUser.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { BACKEND_URL } from "../consts";

export function CreateUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const HandleCreateAccount = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    //alert('Creating account...')
    //Send a POST request
    const url = BACKEND_URL + "/createAccount";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        alert("Account created!");
        sessionStorage.setItem("username", username);
        navigate("/home");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="parent">
        <div className="container">
          <div>
            <h1 className="create-account">Crear una cuenta</h1>
            <div className="loginForm">
              <p className="p-login">Nombre de usuario</p>
              <input
                type="text"
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <p className="p-login">Contraseña</p>
              <input
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="p-login">Repite la contraseña</p>
              <input
                type="password"
                placeholder="repeat password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <button className="styled-button" onClick={HandleCreateAccount}>
            Crear cuenta
          </button>
        </div>
        <div>
          <Link to="/" className="styled-link">
            Ya tengo cuenta...
          </Link>
        </div>
      </div>
    </>
  );
}
