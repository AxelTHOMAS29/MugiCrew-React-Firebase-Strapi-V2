import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { signOut } from "firebase/auth"
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from "../utils/firebase.config"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faMessage, faTrash, faComment, faArrowRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import moment from "moment";

import ConnectModal from '../components/firebase/ConnectModal';
import Navigation from '../components/Navigation';
import Logo from '../components/Logo';
import firebase from 'firebase/compat/app';

const LoginSignUp = () => {

    const [createMessage, setCreateMesssage] = useState(false);
    const [message, setMessage] = useState("");
    const [video, setVideo] = useState("");
    const [user] = useAuthState(auth);
    const [limiteMessage, setLimiteMessage] = useState(10);
    const [loadPost, setLoadPost] = useState(false);
    const [messages, setMessages] = useState([]);
    const [seeDelete, setSeeDelete] = useState(null)

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
    }

    const loadMore = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
            setLoadPost(true);
        }
    }

    //Récupérer les vidéos
    useEffect(() => {
        const handleVideo = () => {
            let findLink = message.split(" ");
            for (let i = 0; i < findLink.length; i++) {
                if (
                    findLink[i].includes("https://www.yout") ||
                    findLink[i].includes("https://yout")
                ) {
                    let embed = findLink[i].replace("watch?v=", "embed/");
                    setVideo(embed.split("&")[0]);
                }
            }
        };
        handleVideo();
    }, [message, video]);

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
            youtube: video,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            name: user.displayName,
            commentNB: 0,
        })
        setLoadPost(true);
        setMessage('');
        setVideo('');
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
                    <Navigation />
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
                                            <div className='img-upload-container'>
                                                <img id='img-post' src='./img/icones/picture.svg' />
                                                <input className='file-upload' type="file" accept='.jpg, .jpeg, .png' name='file'/>
                                            </div>
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
                        {messages && messages.map(msg =>
                        (<div className="message" key={msg.id}>
                            <div className='message-name-date'>
                                <h3 className='message-name'>{msg.name}</h3>
                                <p>{moment(msg.createdAt.toDate()).format("DD/MM/YY HH:MM")}</p>
                            </div>
                            <div className='message-texte'>
                                <ReactMarkdown>{msg.text}</ReactMarkdown>
                                {msg.youtube && (
                                    <iframe src={msg.youtube} frameBorder='0'
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title={msg.youtube}
                                        className='video-youtube' />
                                )}
                            </div>


                            {user && (
                                <div className='delete-container'>
                                    {auth.currentUser.uid === msg.uid && (
                                        <FontAwesomeIcon className='icon-delete' onClick={() => deleteDoc(msg.id)} icon={faTrash} />
                                    )}
                                </div>
                            )}
                            {user && (
                                <div className='delete-mobile-container'>
                                    {auth.currentUser.uid === msg.uid && (
                                        <FontAwesomeIcon className='icon-delete-mobile' onClick={() => setSeeDelete(msg.id)} icon={faPlus} />
                                    )}
                                    {seeDelete === msg.id && (
                                        <div className='delete-mobile-container2' onClick={() => deleteDoc(msg.id)}>
                                            <p>Supprimer le commentaire</p>
                                            <FontAwesomeIcon className='icon-delete-mobile2' icon={faTrash} />
                                        </div>
                                    )}
                                </div>
                            )}
                            <NavLink to={`/discussionDetail/${msg.id}`}>
                                <div>
                                    <FontAwesomeIcon className='icon-comment' icon={faComment} />
                                    {msg.commentNB}
                                    <FontAwesomeIcon className='icon-comment-link' icon={faArrowRight} />
                                </div>
                            </NavLink>
                        </div>))}
                    </div>

                </section>
                <div className='background background2'>
                    <img className='background-Img' src='./img/KaidoBack.jpg' />
                </div>
            </main>
        </div>
    );
};

export default LoginSignUp;