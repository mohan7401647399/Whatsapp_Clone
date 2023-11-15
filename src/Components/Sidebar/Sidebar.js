import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { Avatar, IconButton } from '@mui/material';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import Sidechat from './Sidechat';
import { db } from '../../firebase';


export default function Sidebar({ user,setUser }) {

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const unSubscribe = db.collection('Rooms').onSnapshot((snapshot) => setRooms(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }))
        ))
        return () => unSubscribe()
    }, []);

    return (
        <div className='sidebar'>
            <button className='logout' onClick={() => {
                sessionStorage.setItem("user", "");
                setUser("");
            }}>
                <LogoutIcon/>
                Logout
            </button>
            <div className="sidebar_header">
                <Avatar src={user.photoURL} />
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar_search">
                <div className="searchcontainer">
                    <SearchIcon />
                    <input type="text" placeholder='Search the chat' />
                </div>
            </div>
            <div className='sidebar_sidechat'>
                <Sidechat addNewChat />
                {
                    rooms.map((room) => (
                        <Sidechat
                            key={room.id}
                            id={room.id}
                            name={room.data.Name}
                            photo={room.data.Photo}
                        />
                    ))
                }
            </div>
        </div>
    );
}
