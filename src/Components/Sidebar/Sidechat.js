import React, { useEffect, useState } from 'react';
import './Sidechat.css'
import { Avatar } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';


export default function Sidechat({ id, name, photo, addNewChat }) {

    const [messages, SetMessages] = useState('');

    useEffect(() => {
        if (id) {
            db.collection("Rooms")
                .doc(id).collection("messages")
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => SetMessages(snapshot.docs.map((doc) => doc.data())))
        }
    }, [id]);

    const createChat = () => {
        const roomName = prompt("Please enter the room name");
        const roomPhoto = prompt("Please enter the photo URL");

        if (roomName || roomPhoto) {
            db.collection("Rooms").add({
                Name: roomName,
                Photo: roomPhoto,
            })
        }
    }

    return !addNewChat ? (
        <Link to={`/Rooms/${id}`}>
            <div className="sidechat">
                <Avatar src={photo} />
                <div className="sidechat_info">
                    <h2> {name} </h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ) : (
        <div onClick={createChat} className='sidechat'>
            <h2 className='addnewchat'> <ChatIcon/> Add new Chat</h2>
        </div>
    )
}