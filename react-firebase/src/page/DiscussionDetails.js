import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import firebase from 'firebase/compat/app';

import { db, auth } from '../utils/firebase.config';
import ConnectModal from '../components/firebase/ConnectModal';
import Loading from "../components/Loading"
import Navigation from '../components/Navigation';
import LogoDetails from '../components/LogoDetails';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPaperPlane, faTrash, faArrowRightFromBracket, faPlus } from "@fortawesome/free-solid-svg-icons";

const DiscussionDetails = () => {
    const { id } = useParams();
    const [message, setMessage] = useState("");
    const [user] = useAuthState(auth);
    const [limiteMessage, setLimiteMessage] = useState(10);
    const [loadPost, setLoadPost] = useState(false);
    const [reload, setReload] = useState(false);
    const [test, setTest] = useState(false);
    const [loadMore, setLoadMore] = useState(false);
    const [reduce, setReduce] = useState(false);
    const [seeLog, setSeeLog] = useState(false)
    const [messages, setMessages] = useState([]);
    const [comments, setComments] = useState();
    const [seeDelete, setSeeDelete] = useState(null)

    const commentsRef = db.collection(`messages/${id}/commentaires`);

    //récupérer toutes les données
    const fetchAll = async () => {
        const req = await db.collection('messages').doc(id).get();
        setMessages(req)

        //Récupérer les commentaires
        const reqC = await db.collection(`messages/${id}/commentaires`).orderBy('createdAt', 'desc').limit(limiteMessage).get();
        const allComments = reqC.docs.map((comment) => ({ ...comment.data(), id: comment.id }))
        setComments(allComments)
        setLoadPost(true)
    }


    useEffect(() => {
        fetchAll();
    }, []);

    const sendMessage = async (e) => {
        e.preventDefault();
        const { uid } = auth.currentUser;

        await commentsRef.add({
            comment: message,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            name: user.displayName,
        });
        setReload(true);
        setMessage('');
    }

    const deleteDoc = (a) => {
        db.collection('messages').doc(`${id}`).collection("commentaires").doc(a).delete();
        setReduce(true);
    }

    useEffect(() => {
        if (test) {
            const sendCommentNumber = async (e) => {
                const messagesRef = db.collection('messages').doc(id);
                await messagesRef.update({
                    commentNB: comments.length + 1,
                });
            }; setTest(false)
            sendCommentNumber();
        };
    }, [test])

    useEffect(() => {
        if (reduce) {
            const sendCommentNumber = async (e) => {
                const messagesRef = db.collection('messages').doc(id);
                await messagesRef.update({
                    commentNB: comments.length - 1,
                });
            }; setReduce(false)
            fetchAll();
            sendCommentNumber();
        };
    }, [reduce])

    useEffect(() => {
        if (reload) {
            fetchAll();
            setTest(true);
            setReload(false);
        }
    }, [reload]);

    const loadMoreComments = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
            setLoadMore(true);
        };
    };

    useEffect(() => {
        if (loadMore) {
            setLimiteMessage(limiteMessage + 5);
            setLoadMore(false);
            fetchAll();
        }
        window.addEventListener('scroll', loadMoreComments);
        return () => window.removeEventListener('scroll', loadMoreComments);
    }, [loadMore]);

    return (
        <div className="discussion-details">
            <Navigation />
            <main>
                <div className='background'>
                    <img className='background-Img' src='../img/ShanksBack.jpg' />
                </div>
                <section >
                    <LogoDetails />
                    <Navigation />
                    <div className='title'>
                        <h2>Discussion</h2>
                    </div>
                    <NavLink to="/discussion">
                        <button className='buttonBack'><FontAwesomeIcon icon={faArrowLeft} /></button>
                    </NavLink>
                    {user ? (
                        <div></div>
                    ) : (<div>
                        {seeLog && (
                            <ConnectModal />
                        )}
                    </div>)}

                    <div className='discussion-details-container'>
                        {loadPost ? (
                            <div className='message'>
                                <div className='message-name'>
                                    <h3 className='name-letter'>{messages.data().name[0]}</h3>
                                    <h3>{messages.data().name}</h3>
                                </div>
                                <ReactMarkdown>{messages.data().text}</ReactMarkdown>
                                {user ? (
                                    <form className='form' onSubmit={sendMessage} >
                                        <textarea className='comment-form' placeholder='Ajouter un commentaire...' value={message} onChange={(e) => setMessage(e.target.value)} />
                                        <button type='submit' className='comment-button' disabled={!message}><FontAwesomeIcon className='icon-comment' icon={faPaperPlane} /></button>
                                    </form>
                                ) : (
                                    <span className='comment-unlog'>Vous devez être connecté pour envoyer des commentaires...
                                        <FontAwesomeIcon className='icon-log' onClick={() => setSeeLog(true)} icon={faArrowRightFromBracket} />
                                    </span>
                                )}

                                <div className='comments-container'>
                                    {comments.map(comment => (
                                        <div className='comments-item' key={comment.id}>
                                            <h3>{comment.name}</h3>
                                            <ReactMarkdown>{comment.comment}</ReactMarkdown>

                                            {user && (
                                                <div className='delete-container'>
                                                    {auth.currentUser.uid === comment.uid && (
                                                        <FontAwesomeIcon className='icon-delete' onClick={() => deleteDoc(comment.id)} icon={faTrash} />
                                                    )}
                                                </div>
                                            )}
                                            {user && (
                                                <div className='delete-mobile-container'>
                                                    {auth.currentUser.uid === comment.uid && (
                                                        <FontAwesomeIcon className='icon-delete-mobile' onClick={() => setSeeDelete(comment.id)} icon={faPlus} />
                                                    )}
                                                    {seeDelete === comment.id && (
                                                        <div className='delete-mobile-container2' onClick={() => deleteDoc(comment.id)}>
                                                            <span>Supprimer le commentaire</span>
                                                            <FontAwesomeIcon className='icon-delete-mobile2' icon={faTrash} />
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>) : (
                            <Loading />
                        )}
                    </div>
                </section>
                <div className='background background2'>
                    <img className='background-Img' src='../img/kaidoBack.jpg' />
                </div>
            </main>
        </div>
    );
};

export default DiscussionDetails;