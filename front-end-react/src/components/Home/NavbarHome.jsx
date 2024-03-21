import { useState } from 'react';
import '../../../../../front-end-shared/css/Home/NavbarHome.css';

export function NavbarHome() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return (
        <nav className="navbar-home">
            <div className={`burger`} onClick={toggleMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </div>

            {isOpen && (
                <div className="menu">
                    <p>Perfil</p>
                    <p>Configuración</p>
                    <p>Salir</p>
                </div>
            )}
        </nav>
    );
}