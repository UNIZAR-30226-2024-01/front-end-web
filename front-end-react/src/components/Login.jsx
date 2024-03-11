import { useState } from 'react';
import '../../../../front-end-shared/css/Login/Login.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';



export function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleLogin = () => {
        console.log('username: ', username)
        console.log('password: ', password)
        alert("Loggin in...")
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
        .then(response => response.json())
        .then( () => {
            // alert('Successfully logged in!');
            navigate('/game');
        })

    }

    return (
        <>
        <div className='parent'>
            <div className='container'>
                <h1 className='inicia-sesion'>Inicia sesión</h1>
                <div className='loginForm'>
                    <p className='p-login-account'>Nombre de usuario</p>
                    <input type="text" placeholder="username" onChange={e => setUsername(e.target.value)}/>
                    <p className='p-login-account'>Contraseña</p>
                    <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)}/>
                </div>
                <button className='styled-button' onClick={handleLogin}>Iniciar sesión</button>
            </div>
            <div>
                <Link to="/createUser" className='styled-link'>No tengo cuenta...</Link>
                <Link to="/game" className='styled-link'>Jugar como invitado</Link>    
            </div>        
        </div>
        </>
    )
}