import { useState } from "react";
import "../../../../../front-end-shared/css/Home/Settings.css";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";

import { BACKEND_URL } from "../../consts";

export function Settings() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  // const [cookies, setCookie] = useCookies(["username, token"]);

  const handlePasswordChange = async () => {
    const url = BACKEND_URL + "/changePassword";
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        oldPassword: password,
        newPassword: newPassword,
      }),
    });

    const data = await response.json();
    if (data.success === true) {
      navigate(-1);
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <>
      <div className="settings-div">
        <section>
          <div className="container">
            <h1 className="inicia-sesion">Cambia tu contraseña</h1>
            <div className="loginForm">
              <p className="p-login-account">Nombre de usuario</p>
              <input
                type="text"
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <p className="p-login-account">Contraseña antigua</p>
              <input
                type="password"
                placeholder="old password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="p-login-account">Nueva contraseña</p>
              <input
                type="password"
                placeholder="new password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <button className="login-button" onClick={handlePasswordChange}>
              Aceptar
            </button>
          </div>
          {/* <div>
            <Link to="/createUser" className="login-link">
              No tengo cuenta...
            </Link>
          </div> */}
        </section>
      </div>
    </>
  );
}
