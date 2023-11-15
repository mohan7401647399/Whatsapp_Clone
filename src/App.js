import React, { useState } from 'react'
import './App.css';
import ChatBox from './Components/Chatbox/ChatBox';
import Sidebar from './Components/Sidebar/Sidebar';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './Components/Login/Login';


function App() {
  const [user, setUser] = useState(sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : "");
  return !user ? (
    <Login setUser={setUser} />
  ) :
    (
      <div className="App">
        <div className="app_body">
          <BrowserRouter>
            <Sidebar setUser={setUser} user={user}/>
            <Routes>
              <Route path="/Rooms/:RoomId" element={<ChatBox user={user}/>} />
              <Route path='/' element={<ChatBox user={user}/>} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    );
}

export default App;