import React, { useState } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth, db } from "../utils/firebase.config"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faMessage } from "@fortawesome/free-solid-svg-icons";
import ConnectModal from '../components/firebase/ConnectModal';
import CreatePost from '../components/firebase/CreatePost';
import Message from '../components/firebase/Message';
import Navigation from '../components/Navigation';
import Logo from '../components/Logo';
import firebase from 'firebase/compat/app';

const LoginSignUp = () => {

    const [user, setUser] = useState(null);
    const [createMessage, setCreateMesssage] = useState(false);
    const [message, setMessage] = useState("");
 
    const messagesRef = db.collection('messages');
    
    const sendMessage = async (e) => {
        e.preventDefault();

        const { uid } = auth.currentUser;

        await messagesRef.add({
            text: message,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            name: user.displayName,
        })

        setMessage('');
    }

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })

    const handleLogout = async () => {
        await signOut(auth);
    }

    return (
        <div className='login'>

            <Navigation />
            <main>
                <div className='background'>
                    <img className='background-Img' src='./img/ShanksBack.jpg' />
                </div>
                <section className='home-container'>
                    <Logo />
                    <div className='discussion-title'>
                        <h2>Discussion</h2>
                    </div>
                    {createMessage ?
                        (<div className='app-header'>
                            {user && (
                                <div className='user-infos'>
                                    <span>{user?.displayName[0]}</span>
                                    <h4>{user?.displayName}</h4>
                                    <button onClick={() => handleLogout()}>
                                        <FontAwesomeIcon icon={faArrowRightToBracket} />
                                    </button>
                                </div>
                            )}
                            {user ? (
                                <div className='container'>
                                    <div className='new-post-modal'>
                                        <form onSubmit={sendMessage}>
                                            <textarea placeholder='Message...' value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                                            <input type='submit' disabled={!message} value='Envoyer'></input>
                                        </form>
                                    </div>
                                </div>
                            ) : (
                                <ConnectModal />
                            )
                            }

                        </div>)
                        : (
                            <div className='message-modal' onClick={() => setCreateMesssage(true)}>
                                <FontAwesomeIcon className='icon-message' icon={faMessage} />
                                <h3>Poster un message...</h3>
                            </div>)}
                    <div className='postes-container'></div>
                    <Message />
                </section>
                <div className='background background2'>
                    <img className='background-Img' src='./img/KaidoBack.jpg' />
                </div>
            </main>
        </div>
    );
};

export default LoginSignUp;