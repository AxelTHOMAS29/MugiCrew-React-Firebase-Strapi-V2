import React, { useRef, useState, useEffect } from 'react';
import { db, auth } from '../../utils/firebase.config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


const Message = () => {
    const [limiteMessage, setLimiteMessage] = useState(10);
    const [loadPost, setLoadPost] = useState(false);
    const [messages, setMessages] = useState([]);
    const dummy = useRef();

    const fetchAll = async () => {
        const req = await db.collection('messages').orderBy('createdAt', 'desc').limit(limiteMessage).get();
        const allMessages = req.docs.map((messages) => ({ ...messages.data(), id: messages.id }))
        setMessages(allMessages)
    }

    useEffect(() => {
        fetchAll();
    }, [])

    console.log(messages)

    //const messagesRef = db.collection('messages');
    //const query = messagesRef.orderBy('createdAt', "desc");
    const [user] = useAuthState(auth);
    //const [messages] = useCollectionData(query, { idField: 'id' });


    //const test = messages.slice(0, limiteMessage) 

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

    useEffect(() => {
        if (loadPost) {
            setLimiteMessage(limiteMessage + 5);
            setLoadPost(false);
            fetchAll();
        }
        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore);
    }, [loadPost]);


    return (
        <div>
            <div className='messages-container'>
                {messages && messages.map(msg => <ChatMessage key={msg.createdAt} message={msg} />)}

                <span ref={dummy}></span>
            </div>
        </div>
    );

    function ChatMessage(props) {
        const { text, name, uid, id } = props.message;


        //const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
        //auth.currentUser.uid === uid &&
        //onClick={() => deleteDoc(id)}

        return (<>
            <div className="message">
                <h3 className='message-name'>{name}</h3>
                <ReactMarkdown className='message-texte'>{text}</ReactMarkdown>
                {user && (
                    <div className='test'>
                        {auth.currentUser.uid === uid && (
                            <FontAwesomeIcon className='icon-delete' onClick={() => deleteDoc(id)} icon={faTrash} />
                        )}
                    </div>
                )}
            </div>
        </>)
    };
};

export default Message;