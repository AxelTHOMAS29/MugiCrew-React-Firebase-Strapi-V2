import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { signOut } from "firebase/auth"
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from "../utils/firebase.config"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faMessage, faTrash, faComment, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

import ConnectModal from '../components/firebase/ConnectModal';
import Navigation from '../components/Navigation';
import Logo from '../components/Logo';
import firebase from 'firebase/compat/app';

const LoginSignUp = () => {

    const [createMessage, setCreateMesssage] = useState(false);
    const [message, setMessage] = useState("");
    const [user] = useAuthState(auth);
    const [limiteMessage, setLimiteMessage] = useState(10);
    const [loadPost, setLoadPost] = useState(false);
    const [messages, setMessages] = useState([]);

    const messagesRef = db.collection('messages');

    //récupérer toutes les données
    const fetchAll = async () => {
        const req = await db.collection('messages').orderBy('createdAt', 'desc').limit(limiteMessage).get();
        const allMessages = req.docs.map((messages) => ({ ...messages.data(), id: messages.id }))
        setMessages(allMessages)

        //Récupérer les commentaires
        allMessages.map(async (elem) => {
            const reqC = await db.collection(`messages/${elem.id}/commentaires`).orderBy('createdAt', 'desc').get();
            const allComments = reqC.docs.map((comment) => ({ ...comment.data(), id: comment.id })) 
        })
    }

    useEffect(() => {
        fetchAll();
    }, [])

    //supprimer un doc
    const deleteDoc = (id) => {
        db.collection('messages').doc(id).delete()
        setLoadPost(true)
            .then(() => {
                console.log('succes')
            })
    }

    const loadMore = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
            setLoadPost(true);
        }
    }

    //rendre la page dynamique
    useEffect(() => {
        if (loadPost) {
            setLimiteMessage(limiteMessage + 5);
            setLoadPost(false);
            fetchAll();
        }
        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore);
    }, [loadPost]);

    //envoyer un message
    const sendMessage = async (e) => {
        e.preventDefault();

        const { uid } = auth.currentUser;

        await messagesRef.add({
            text: message,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            name: user.displayName,
            commentNB: 0,
        })
        setLoadPost(true)
        setMessage('');
    }


    //déconexion
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
                    <div className='messages-container'>
                        {messages && messages.map(msg => <ChatMessage key={msg.createdAt} message={msg} />)}
                    </div>
                </section>
                <div className='background background2'>
                    <img className='background-Img' src='./img/KaidoBack.jpg' />
                </div>
            </main>
        </div>
    );

    function ChatMessage(props) {
        const { text, name, uid, id, commentNB } = props.message;
        const [seeComments, setSeeComments] = useState(false);
        console.log(commentNB)
        const commentNumber = commentNB === 0 ? 'NoSee' : 'see';
        return (<>
            <div className="message">
                <h3 className='message-name'>{name}</h3>
                <div className='message-texte'>
                    <ReactMarkdown>{text}</ReactMarkdown>
                </div>
                {user && (
                    <div className='test'>
                        {auth.currentUser.uid === uid && (
                            <FontAwesomeIcon className='icon-delete' onClick={() => deleteDoc(id)} icon={faTrash} />
                        )}
                    </div>
                )}
                <NavLink to={`/discussionDetail/${id}`}>
                    <div>
                        <FontAwesomeIcon className='icon-comment' icon={faComment} />
                        {commentNB}
                        <FontAwesomeIcon className='icon-comment-link' icon={faArrowRight} />
                    </div>
                </NavLink>
            </div>
        </>)
    };
};

export default LoginSignUp;