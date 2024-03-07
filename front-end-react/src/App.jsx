import '../../../front-end-shared/css/App.css'
import { Login } from './components/Login'
import { Game } from './components/Game/Game'
import { Routes, Route, /*Link*/ } from 'react-router-dom'
// import { Carta } from './components/Carta.jsx'

/****** 👇🏼 ROUTES 👇🏼 ****** 
# Not logged--> create account (username + password) or login
# Logged: 
  -no game started
    -starting game (loading screen waiting for other players)
    -in-game (new game)
  -game started
    -in-game (waiting for other players to join)
**************************/

function App() {
  
  return (
    <>
      {/* 
          If there's something you want to render in every page, put it here 
          The rest of the routing rendering will be inside 'Routes'

          Use 'Link' to navigate between pages instead of 'a' tags because 'a' tags will refresh the page
          and 'Link' will only change the URL (fast and smooth navigation between pages)

          If you try to navigate to an url but you're not logged in, after logging in it can be used 'useLocation' hook 
          to navigate to that previous url you were trying to access. 
      */}
    
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/login' element={<h1>¡Inicia sesión!</h1>}/>        
        <Route path='/menu' element={<h1>Menu</h1>}/>
        <Route path='/game' element={<Game/>}/>
        <Route path='*' element={<h1>Not found</h1>}/> 
      </Routes> 
   
    </>
  )
}

export default App
