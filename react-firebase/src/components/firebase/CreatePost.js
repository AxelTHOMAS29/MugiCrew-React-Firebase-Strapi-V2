import React, { useState, useRef } from 'react';
import { db, auth } from '../../utils/firebase.config';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/compat/app';

const CreatePost = () => {
    const [message, setMessage] = useState("");
    const [user] = useAuthState(auth);
 
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
    console.log(message)

    return (
        <div className='container'>
            <div className='new-post-modal'>
                <form onSubmit={sendMessage}>
                    <textarea placeholder='Message...' value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                    <input type='submit' disabled={!message} value='Envoyer'></input>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;