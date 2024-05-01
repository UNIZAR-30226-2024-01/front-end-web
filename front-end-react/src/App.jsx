import '../../../front-end-shared/css/App.css';
import { CreateUser } from './components/CreateUser';
import { Login } from './components/Login';
import { Home } from './components/Home/Home';
import { Settings } from './components/Home/Settings';
import { Game } from './components/Game/Game';
import { Page404 } from './components/Page404';
import { ShowCartas } from './components/Cartas/ShowCartas';
import { useCookies } from 'react-cookie';
import { Navigate, useRoutes /* , useParams */ } from 'react-router-dom';

import { useEffect, useRef } from 'react';

import { Contexts } from './context/Contexts';

function App() {
  const [cookies] = useCookies(['token', 'partida_actual']);

  let element = useRoutes([
    {
      path: '/login',
      element: cookies.token ? <Navigate to="/" /> : <Login />,
    },
    {
      path: '/createuser',
      element: cookies.token ? <Navigate to="/" /> : <CreateUser />,
    },
    {
      path: '/',
      element: cookies.token ? <Home /> : <Navigate to="/login" replace />,
    },
    {
      path: 'settings',
      element: cookies.token ? <Settings /> : <Navigate to="/login" replace />,
    },
    {
      path: '/game/:idGame',
      element: cookies.token ? <Game /> : <Navigate to="/login" replace />,
    },
    {
      path: '/cartas',
      element: cookies.token ? <ShowCartas /> : <Navigate to="/login" replace />,
    },
    {
      // EASTER EGG
      path: '/helloworld',
      element: (
        <h1 style={{ color: 'white', height: '100vh' }}>Hello World. Enhorabuena, ¡encontraste un easter egg🥚!</h1>
      ),
    },
    { path: '*', element: <Page404 /> },
  ]);

  return (
    <Contexts>
      <Audio />
      {element}
    </Contexts>
  );
}

function Audio() {
  const audioRef = useRef(); // Create a ref

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Set volume to 30%
    }

    const playAudio = () => {
      // Play the audio when this function is called
      audioRef.current.play();
    };

    // Add event listener for 'mousemove' event

    document.addEventListener('click', playAudio);

    // Remove event listener on cleanup
    return () => {
      document.removeEventListener('click', playAudio);
    };
  }, []);

  // ¿Bajarle el volumen?
  return <audio loop={true} ref={audioRef} src="/CluedoBanger.mp3" type="audio/mpeg" />;
}

// function Audio() {
//   // return <audio src="/CluedoBanger.mp3" autoPlay type="audio/mpeg" />;
//   return (
//     <audio controls autoPlay muted src="/CluedoBanger.mp3" type="audio/mpeg" />
//     // {/* <source src="../../../front-end-shared/CluedoBanger.mp3" type="audio/mpeg" /> */}
//     // {/* <source src="/CluedoBanger.mp3" type="audio/mpeg" /> */}
//     // </audio>
//   );
// }

export default App;
