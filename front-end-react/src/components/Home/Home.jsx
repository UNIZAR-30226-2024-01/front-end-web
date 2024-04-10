import { ProgressBar } from "./ProgressBar";
import { NavbarHome } from "./NavbarHome";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";
import "../../../../../front-end-shared/css/Home/Home.css";
import boardGame from "../../../../../front-end-shared/images/boardGame.png";

export function Home() {
  const [showGameModes, setShowGameModes] = useState(true);
  const navigate = useNavigate();
  const [cookies] = useCookies(["username"]);

  const newGameClick = () => {
    navigate("/game");
  };

  const joinGameClick = () => {
    const gameId = window.prompt("Please enter the game ID:");
    if (gameId) {
      navigate(`/game/${gameId}`);
    }
  };

  // console.log(username)

  return (
    <div className="home-root">
      <NavbarHome />
      <section className="aux">
        <div className="home-username">
          <p>{cookies.username}</p>
        </div>
        <ProgressBar />
      </section>

      <section className="home-body">
        <img
          src={boardGame}
          alt="Tablero del juego"
          width={400}
          height={400}
          // className="provisional-board-image"
        />

        <aside className="gameModes">
          {showGameModes ? (
            <>
              <button
                className="gamemode-button"
                onClick={() => {
                  setShowGameModes(!showGameModes);
                }}
              >
                Solitario
              </button>
              <button
                className="gamemode-button"
                onClick={() => {
                  setShowGameModes(!showGameModes);
                }}
              >
                Multijugador
              </button>
            </>
          ) : (
            <>
              <button className="gamemode-button" onClick={newGameClick}>
                Nueva partida
              </button>

              <button className="gamemode-button" onClick={joinGameClick}>
                Unirse a partida
              </button>
            </>
          )}
        </aside>
      </section>
    </div>
  );
}
