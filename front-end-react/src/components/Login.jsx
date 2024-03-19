import { useState } from 'react';
import '../../../../front-end-shared/css/Login/Login.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['user']);

    const handleLogin = async () => {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });
        const data = await response.json();
        if (data.success === true) {
            setCookie('user', username, { path: '/' });

            navigate('/home');
        } else {
            alert('Usuario o contraseña incorrectos');
        }
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