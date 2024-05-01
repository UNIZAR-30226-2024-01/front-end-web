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


export function Game() {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(['username', 'partida_actual']);
  // const [cookiesHaveChanged, setCookiesHaveChanged] = useState();

  // si hay algo distinto al codigo de la partida, NAVIGATE
  // si no hay nada, o si esta el codigo, NO NAVIGATE

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
  const { setPausedGame, setRequestedPause } = useContext(GameInfoContext);

  const [winnedGame, setWinnedGame] = useState(false);
  const { width, height } = useWindowSize();

  const { idGame } = useParams();

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
        const am_i_in = data.areAvailable?.includes(cookies.username);
        /**
         * Deja entrar en una partida en los siguientes casos:
         * - Ya estoy dentro de la partida (tengo un personaje seleccionado)
         * - No ha habido error, no ha empezado todavía y no estoy en otra partida
         * - Mis cookies son correctas (idGame adecuado)
         * - Es una partida local y esta vacia de jugadores
         */
        if (
          am_i_in ||
          (data.exito && data.estado === '0' && data.tipo == 'o' && cookies['partida_actual']?.partida === '') ||
          cookies['partida_actual']?.partida == idGame ||
          (data.areAvailable?.every((item) => item === '') && data.estado === '0' && data.tipo === 'l')
        ) {
          // no ha habido error y no ha empezado todavía, o bien estoy en la partida y mis cookies son correctas
          setCookies('partida_actual', { partida: idGame }, { path: '/' });

          setPausedGame(data.estado === 'p');
          setRequestedPause(false);

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

  const startGame = () => {
    setStarted(true);
    console.log('start game');
    socket.emit('start-game');
  };

  const handleCharacterSelection = () => {
    console.log('character selected');
    setCharacterSelection(false);
  };

  return (
    <>
      {characterSelection && (
        <div className="game-characters-selection">
          <CharacterSelection onCharacterSelected={handleCharacterSelection} />
        </div>
      )}
      {!characterSelection && !started && (
        <section className="start-game-button-main">
          <div className="start-game-button-container">
            <h1>Esperando a que empiece la partida...</h1>
            <h2>
              <u>ID de partida:</u> {idGame}
            </h2>
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
