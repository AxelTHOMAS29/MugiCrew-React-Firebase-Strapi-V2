import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { auth } from '../../utils/firebase.config';

const Login = () => {
    const loginEmail = useRef();
    const loginPassword = useRef();
    const [error, setError] = useState(false);
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail.current.value,
                loginPassword.current.value
            )

        } catch (error) {
            console.log(error.message)
            setError(true);
            setPassword('');
        }
    };

    return (
        <div className='login-container'>
            <div className='login'>
                <h3>Se connecter</h3>
                <form className='form-login' >
                    <input
                        type='email'
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder='Email'
                        ref={loginEmail}>
                    </input>
                    <input
                        type='password'
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder='Mot de passe'
                        ref={loginPassword}>
                    </input>
                    <input
                        type='submit'
                        value='Se connecter'
                        onClick={e => handleLogin(e)}>
                    </input>
                    <span>
                        {error && "L'Email ou le mot de passe ne correspondent pas"}
                    </span>
                </form>
            </div>
        </div>
    );
};

export default Login;