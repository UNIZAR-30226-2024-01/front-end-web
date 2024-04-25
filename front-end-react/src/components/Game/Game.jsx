import '../../../../../front-end-shared/css/Game/Game.css';

import { Tarjeta } from './Tarjeta/Tarjeta.jsx';
import { NavbarGame } from './NavbarGame.jsx';
import { Chat } from './Chat/Chat.jsx';
import { Turno } from './Turno/Turno.jsx';
import { CartaDesplegable } from './Cartas/CartaDesplegable.jsx';
import { CharacterSelection } from './CharacterSelection.jsx';
import { CartaShower } from './Cartas/CartaShower.jsx';
// import { Turno } from "./Turno/Turno.jsx";
import { useEffect, useState, useContext } from 'react';
// import { useFetch } from "../../hooks/useFetch.jsx";
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';

import { SocketContext } from '../../context/socket';
import { socketio } from '../../socketio';
import { MainTablero } from './Tablero/MainTablero.jsx';
import { GameInfoContext } from '../../context/gameinfo.jsx';
import { TurnoContext } from '../../context/turno.jsx';
import { GameLogic } from '../../logic/GameLogic.jsx';
import { ShowCardsContext } from '../../context/showcards.jsx';
import { BACKEND_URL } from '../../consts';

export function Game() {
  const [cookies] = useCookies(['username', 'group']);
  const { turnoOwner, setTurnoOwner } = useContext(TurnoContext);
  const { usernames, started, setStarted } = useContext(GameInfoContext);
  const haveISelected = usernames.includes(cookies.username);
  const [characterSelection, setCharacterSelection] = useState(!haveISelected);

  const navigate = useNavigate();
  const { idGame } = useParams();

  const { socket, setSocket } = useContext(SocketContext);

  // Check if the game exists and if that't the case, assign the socket to the context
  useEffect(() => {
    console.log('Checking if game exists');
    const url = BACKEND_URL + '/getGame?idGame=' + idGame;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.exito === true) {
          console.log('Game exists');
          setSocket(socketio);
        } else {
          alert('La partida no existe. Inténtalo de nuevo.');
          navigate('/');
        }
      });
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.auth.username = cookies.username ?? 'anonymous';
    socket.auth.group = idGame ?? cookies.group ?? '0';
    socket.connect();
  }, [socket]);

  /* Get the users from the database and if there isn't 
    enough players, set the name 'Bot_i' */

  const startGame = () => {
    setStarted(true);
    console.log('start game');
    socket.emit('start-game');
  };

  const handleCharacterSelection = () => {
    console.log('character selected');
    setCharacterSelection(false);
  };

  // const { showQuestion, showCardShowed, showCardElection } = useContext(ShowCardsContext);
  // useEffect(() => {
  //   // showQuestion('Mr Soper', ['MISS IA', 'SUSPENSO', 'CAFETERIA']);
  //   // showCardShowed('rold', 'mat', ['MISS IA'], ['MISS IA', 'SUSPENSO', 'CAFETERIA']);
  //   const onClick = (card) => {
  //     console.log('card selected', card);

  //   };
  //   showCardElection('mat', ['MISS IA', 'SUSPENSO', 'CAFETERIA'], ['MISS IA', 'SUSPENSO', 'baños'], onClick);
  // }, []);

  return (
    <>
      {characterSelection && (
        <div className="game-characters-selection">
          <CharacterSelection onCharacterSelected={handleCharacterSelection} />
        </div>
      )}
      {!started && (
        <button className="start-game-button" onClick={startGame}>
          Comenzar partida
        </button>
      )}

      {/* <button
        onClick={() => {
          setTurnoOwner(cookies.username);
        }}
      >
        Set turnoOwner a mi nombre
      </button> */}

      <GameLogic />
      {turnoOwner === cookies.username && <Turno />}

      <CartaShower />
      <NavbarGame />
      <Tarjeta />
      <Chat />
      <CartaDesplegable />
      <MainTablero />
    </>
  );
}
