import '../../../front-end-shared/css/App.css';
import { CreateUser } from './components/CreateUser';
import { Login } from './components/Login';
import { Home } from './components/Home/Home';
import { Settings } from './components/Home/Settings';
import { Game } from './components/Game/Game';
import { Page404 } from './components/Page404';
import { ShowCartas } from './components/Cartas/ShowCartas';
import { useCookies } from 'react-cookie';
import { Navigate, useRoutes } from 'react-router-dom';

import { Contexts } from './context/Contexts';

function App() {
  const [cookies] = useCookies(['token']);

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
    { path: '*', element: <Page404 /> },
  ]);

  return <Contexts>{element}</Contexts>;
}

export default App;
