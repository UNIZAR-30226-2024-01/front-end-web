import { ProgressBar } from "./ProgressBar"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useCookies } from "react-cookie"
import '../../../../../front-end-shared/css/Home/Home.css'

export function Home() {

    const [completed, setCompleted] = useState(69)
    const [showGameModes, setShowGameModes] = useState(true)
    const navigate = useNavigate()
    const [cookies] = useCookies(['user'])

    // Hide the 'Solitario' and 'Multijugador' buttons and show the 'Partida nueva' and 'Unirse a partida' buttons
    const handleFirstClick = () => {
        setShowGameModes(!showGameModes)
    }

    const newGameClick = () => {
        navigate('/game')
    }

    const joinGameClick = () => {
        const gameId = window.prompt("Please enter the game ID:");
        if (gameId) {
            navigate(`/game/${gameId}`);
        }
    }

    // console.log(username)

    return (
        <div className="home-root">
            <section className="aux">
                <div className="home-username">
                    <p>{cookies.user}</p>
                </div>
                <ProgressBar completed={completed}/>
            </section>

            <section className="home-body">
                <div className="provisional-board-image">
                    <strong>Sample board</strong>    
                </div> 

                <aside className="gameModes">
                    {showGameModes ? (
                        <>
                            <button className="gamemode-button" onClick={handleFirstClick}>Solitario</button>
                            <button className="gamemode-button" onClick={handleFirstClick}>Multijugador</button>
                        </>
                    ) : (
                        <>
                            <button className="gamemode-button" onClick={newGameClick}>Nueva partida</button>
                            <button className="gamemode-button" onClick={joinGameClick}>Unirse a partida</button>
                        </>
                    )}
                </aside>
            </section>
        </div>
    )
}