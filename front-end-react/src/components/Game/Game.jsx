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
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

// import { ShowCardsContext } from '../../context/showcards.jsx';
import { BACKEND_URL } from '../../consts';

// import { useJoinGame } from '../../hooks/useJoinGame.jsx';

export function Game() {
  const navigate = useNavigate();
  const { idGame } = useParams();
  const [cookies, setCookies] = useCookies(['username', 'partida_actual']);

  // si hay algo distinto al codigo de la partida, NAVIGATE
  // si no hay nada, o si esta el codigo, NO NAVIGATE
  useEffect(() => {
    if (!cookies['partida_actual'] || cookies['partida_actual']?.partida != idGame) navigate('/');
  }, [idGame]);

  if (cookies['partida_actual'] == {}) {
    console.log('se actualiza partida actual a ', idGame);
    setCookies('partida_actual', { partida: idGame }, { path: '/' });
  }

  const { turnoOwner } = useContext(TurnoContext);
  const { usernames, started, setStarted } = useContext(GameInfoContext);

  // console.log('usernames:', usernames);
  // console.log('cookies.username:', cookies.username);
  const haveISelected = usernames?.includes(cookies.username);

  // console.log('haveISelected:', haveISelected);
  const [characterSelection, setCharacterSelection] = useState(!haveISelected);

  // Evitar renderizados erróneos al recargar la partida
  useEffect(() => {
    setCharacterSelection(!usernames?.includes(cookies.username));
  }, [usernames, haveISelected]);

  const { socket, setSocket } = useContext(SocketContext);

  const [winnedGame, setWinnedGame] = useState(false);
  const { width, height } = useWindowSize();

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
        console.log(data);
        const am_i_in = data.areAvailable.includes(cookies.username);
        if (data.exito === true || am_i_in) {
          console.log('Game exists');
          setSocket(socketio);
        } else {
          alert('No se ha podido unirse a la partida. Inténtalo de nuevo.');
          navigate('/');
        }
      });
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.auth.username = cookies.username ?? 'anonymous';
    socket.auth.group = idGame ?? cookies.group ?? '0';

    console.log('Connecting socket with username:', socket.auth.username, 'and group:', socket.auth.group);
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

  // const sendDeleteMessage = () => {
  //   socket.emit('hola-javisin-adios', {});
  // };

  return (
    <>
      {/* {
        <button style={{ position: 'absolute', top: '5%', left: '20%' }} onClick={sendDeleteMessage}>
          delete
        </button>
      } */}
      {characterSelection && (
        <div className="game-characters-selection">
          <CharacterSelection onCharacterSelected={handleCharacterSelection} />
        </div>
      )}
      {!characterSelection && !started && (
        <section className="start-game-button-main">
          <div className="start-game-button-container">
            <h1>Esperando a que empiece la partida...</h1>
            <button className="start-game-button" onClick={startGame}>
              Comenzar partida
            </button>
          </div>
        </section>
      )}
      <GameLogic setWinnedGame={setWinnedGame} />
      {winnedGame && <Confetti width={width} height={height} />}
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
