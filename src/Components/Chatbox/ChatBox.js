import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@mui/icons-material';
import MicIcon from '@mui/icons-material/Mic';
import { Avatar, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react';
import './ChatBox.css';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { serverTimestamp } from 'firebase/firestore';

export default function ChatBox({ user }) {

    const { RoomId } = useParams();
    const [roomData, setRoomData] = useState('');
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection("Rooms").doc(RoomId).collection("messages").add({
            message: input,
            name: user.displayName,
            timestamp: serverTimestamp()
        });
        setInput('')
    }


    useEffect(() => {
        if (RoomId) {
            db.collection('Rooms').doc(RoomId).onSnapshot((snapshot) => setRoomData(snapshot.data()))

            db.collection("Rooms").doc(RoomId).collection("messages").orderBy("timestamp", "desc").onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data())))
        }
    }, [RoomId]);

    return (
        <div className='chat'>
            <div className="chat_header">
                <Avatar src={roomData.Photo} />
                <div className="chat_header_info">
                    <h3>{roomData.Name}</h3>
                    <p>
                        last Seen {new Date(
                            messages[0]?.timestamp?.toDate())
                            .toUTCString()} </p>
                </div>
                <div className="chat_header_right">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat_body">
                {
                    messages.map((message) => (
                        <p className={`chat_message ${message.name === user.displayName && "chat_receiver"
                            }`}>
                            <span className="chat_name"> {message.name} </span>
                            {
                                message.message
                            }
                            <span className="chat_timestamp">
                                {new Date(
                                    messages[messages.length - 1]?.timestamp?.toDate())
                                    .toUTCString()}
                            </span>
                        </p>
                    ))
                }
            </div>
            <div className="chat_footer">
                <InsertEmoticon />
                <form action="">
                    <input type="text" value={input} onChange={e => setInput(e.target.value)} />
                    <button type="submit" onClick={sendMessage}>Send a Message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}
