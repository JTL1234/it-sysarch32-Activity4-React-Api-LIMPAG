import React, { useState } from 'react';
import Signup from "./Signup";
import Home from './Home';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [token, setToken] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:2000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: username,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Auth successful') {
                setMessage('Login Successfully');
                setToken(data.token); // Set token from response
                setIsLoggedIn(true);
                onLogin(data.token); // Invoke callback with token
            } else {
                setMessage('Login Failed');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleForm = () => {
        setIsLogin(!isLogin); 
        setMessage('');
    };

    const handleSignupClose = () => {
        toggleForm(); 
    };

    return (
        <>
            {isLoggedIn ? ( 
                <Home token={token} />
            ) : (
                <div className='background1'>
                    <div className='background2'>
                    {isLogin ? ( 
                        <>
                            <div className="wrapper" >
                                    <form onSubmit={handleSubmit}>
                                        <h1>Login</h1>
                                        <div className="user-box">
                                            <box-icon name='user'></box-icon>
                                            <input type="text" placeholder="Username" required value={username} onChange={handleUsernameChange} />
                                        </div>
                                        <div className="password-box">
                                            <box-icon name='password' type='solid'></box-icon>
                                            <input 
                                                type={showPassword ? 'text' : 'password'} 
                                                placeholder="Password" 
                                                required 
                                                value={password} 
                                                onChange={handlePasswordChange} 
                                            />
                                            <box-icon 
                                                name={showPassword ? 'eye' : 'eye-off'}
                                                onClick={togglePasswordVisibility}
                                                style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
                                            ></box-icon>
                                        </div>
                
                                        <button type="submit" className="btn">Login</button>
                
                                        <div className="register-link">
                                            <p>Don't have an account? <a href="#" onClick={toggleForm}>Register</a></p> 
                                        </div>
                                    </form>
                                {message && <div>{message}</div>}
                            </div>
                        </>
                    ) : ( 
                    <Signup onClose={handleSignupClose} />
                )}
                    </div>
                </div>
            )}
        </>
    );
    
}

export default Login;
