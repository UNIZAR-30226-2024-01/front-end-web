import "../../../front-end-shared/css/App.css";
import { CreateUser } from "./components/CreateUser";
import { Login } from "./components/Login";
import { Home } from "./components/Home/Home";
import { Settings } from "./components/Home/Settings";
import { Game } from "./components/Game/Game";
import { Page404 } from "./components/Page404";
// import { Routes, Route /*Link*/ } from "react-router-dom";
import { ShowCartas } from "./components/Cartas/ShowCartas";
import { useCookies } from "react-cookie";
import { Navigate, useRoutes } from "react-router-dom";

function App() {
  const [cookies] = useCookies(["token"]);

  let element = useRoutes([
    { path: "/", element: <Login /> },
    { path: "/create-user",
      component: <CreateUser />},
    {
      path: "/home",
      element: cookies.token ? <Home /> : <Navigate to="/" replace />,
    },
    {
      path: "settings",
      element: cookies.token ? <Settings /> : <Navigate to="/" replace />,
    },
    {
      path: "/game",
      element: cookies.token ? <Game /> : <Navigate to="/" replace />,
    },
    {
      path: "/cartas",
      element: cookies.token ? <ShowCartas /> : <Navigate to="/" replace />,
    },
    { path: "*", element: <Page404 /> },
  ]);

  return element;

  // return (
  //   <Routes>
  //     <Route path="/" element={<Login />} />
  //     <Route path="/createuser" element={<CreateUser />} />
  //     <ProtectedRoute path="/home" element={<Home />} />
  //     <ProtectedRoute path="/game" element={<Game />} />
  //     <ProtectedRoute path="/cartas" element={<ShowCartas />} />
  //     <Route path="*" element={<Page404 />} />
  //   </Routes>
  // );
}

export default App;
