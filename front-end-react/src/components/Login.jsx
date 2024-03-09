import { useState } from 'react';
import '../../../../front-end-shared/css/Login/Login.css'
import { Link } from 'react-router-dom'

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleCreateAccount = () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        alert('Creating account...')
        // Send a POST request
        // fetch('http://localhost:3000/createAccount', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         username: username,
        //         password: password,
        //     }),
        // })
        // .then(response => response.json())
        // .then(data => {
        //     alert('Account created!');
        //     // Handle the response data
        // })
        // .catch((error) => {
        //     console.error('Error:', error);
        // });
    }

    return (
        <>
        <div>
            <h1>Crear una cuenta</h1>
            <div className='loginForm'>
                <p>Nombre de usuario</p>
                <input type="text" placeholder="javisin22" onChange={e => setUsername(e.target.value)}/>
                <p>Contraseña</p>
                <input type="password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)}/>
                <p>Repite la contraseña</p>
                <input type="password" placeholder="Contraseña" onChange={e => setConfirmPassword(e.target.value)}/>
            </div>
        </div>
        <button className='styled-button' onClick={handleCreateAccount}>Crear cuenta</button>
        <div>
            <Link to="/login" className='styled-link'>Ya tengo cuenta...</Link>
            <Link to="/game" className='styled-link'>Jugar como invitado</Link>    
        </div>
        </>
    )
}