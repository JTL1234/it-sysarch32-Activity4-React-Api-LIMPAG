import React, { useState } from 'react';

function Signup({ onClose }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false); 

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:2000/user/signup', {
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
            if (data.message === 'User created') {
                setMessage('SignUp Successfully');
                setIsSuccess(true); 
            } 
            else if(data.message === 'Mail exists') {
                setMessage('This email is already registered');
            }
            else {
                setMessage('Signup Failed');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
    };

 

    return (
        <div className='background1'>
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <h1>SignUp</h1>
                    <div className="user-box">
                        <box-icon name='user'></box-icon>
                        <input type="text" placeholder="Username" required value={username} onChange={handleUsernameChange} />
                    </div>
                    <div className="password-box">
                        <box-icon name='lock-alt' type='solid'></box-icon>
                        <input type={showPassword ? 'text' : 'password'} placeholder="Password" required value={password} onChange={handlePasswordChange} />
                    </div>
                    <div className='btnSubmit'>
                        <button type="submit" className="btn">SignUp</button>
                    </div>
                    <div className="register-link">
                        <p>already have an account? <a href="#" onClick={onClose}>Login</a></p> 
                    </div>
                </form>
                {isSuccess ? (
                    <div>
                        <p>{message}</p>
                    </div>
                ) : (
                    <div>
                        <p>{message}</p>
                        
                    </div>
                )}
            </div>
        </div>
    );
}

export default Signup;