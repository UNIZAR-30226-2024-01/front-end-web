// import { useState } from "react";
import "../../../../../front-end-shared/css/Game/NavbarGame.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DesplegablesContext } from "../../context/desplegables";

export function NavbarGame() {
  const {
    opcionesDesplegado,
    setOpcionesDesplegado,
    setChatDesplegado,
    setCartasDesplegado,
    setTarjetaDesplegado,
  } = useContext(DesplegablesContext);

  const [cookies] = useCookies(["username"]);

  const navigate = useNavigate();
  const toggleMenu = () => {
    setOpcionesDesplegado((prev) => !prev);
  };

  return (
    <nav className="navbar-game">
      <div className={`burger`} onClick={toggleMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>

      {opcionesDesplegado && (
        <div className="menu">
          <p
            onClick={() => {
              navigate("/home");
            }}
          >
            Abandonar partida
          </p>
          <p>Test_1</p>

          <p>¡Suerte @{cookies.username}!</p>
        </div>
      )}
    </nav>
  );
}
