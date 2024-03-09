import { useState } from 'react';
import '../../../../front-end-shared/css/Login/LoginAccount.css'
import { Link } from 'react-router-dom'



export function LoginAccount() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const handleCreateAccount = () => {
        alert("Loggin in...")

        fetch('http://localhost:3000/login', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
        .then(response => response.json())
        .then(data => {
            alert('Successfully logged in!');
            // Handle the response data
        })

    }

    return (
        <>
        <div>
            <h1>Inicia sesión</h1>
            <div className='loginForm'>
                <p>Nombre de usuario</p>
                <input type="text" placeholder="javisin22" onChange={e => setUsername(e.target.value)}/>
                <p>Contraseña</p>
                <input type="password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)}/>
            </div>
        </div>
        <button className='styled-button' onClick={handleCreateAccount}>Crear cuenta</button>
        {/* <div>
            <Link to="/login" className='styled-link'>Ya tengo cuenta...</Link>
            <Link to="/game" className='styled-link'>Jugar como invitado</Link>    
        </div>         */}
        </>
    )
}