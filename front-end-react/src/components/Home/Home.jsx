import { ProgressBar } from "./ProgressBar"
import { useState } from "react"
import '../../../../../front-end-shared/css/Home/Home.css'

export function Home() {

    const [completed, setCompleted] = useState(69)

    return (
        <div className="home-root">
            <section className="aux">
                <div className="home-username">
                    <p>alexelcapo</p>
                </div>
                <ProgressBar completed={completed}/>
            </section>

            <section className="home-body">
                <div className="provisional-board-image"/>

                <aside className="gameModes">
                    {/* TO-DO: Cuando clicas Singleplayer o Multiplayer, desaparecen
                    y después salen: 'Partida nueva', 'Unirse a partida' */}
                    <button className="gamemode-button">Solitario</button>
                    <button className="gamemode-button">Multijugador</button>
                </aside>
            </section>
        </div>
    )
}
