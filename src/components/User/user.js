import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
// import { history } from '../../routes'
import { useHistory } from "react-router-dom";


import './user.scss';

const User = () => {
    let history = useHistory();
    const [users, setUsers] = useState([])
    const [msg, setMsg] = useState(false)
    useEffect(() => {
        const socket = socketIOClient("http://localhost:3001");
        socket.on("user", data => {
            console.log(data)
        });
        const userName = prompt('Enter Your Name');
        socket.emit('join', userName);
        socket.on('message', (data) => {
            if (data === 'full') {
                setMsg(true)
            } else {
                setUsers(data)
                if (data.length === 4) {
                    history.push('play')
                }
            }
        });
    }, [])

    return (
        <div className="users">
            <h1>Welcome to Ludo Game</h1>
            {!msg && users.map(user => <div>{user} Joined...</div>)}
            {msg && <div>Already enough players have joined</div>}
        </div>
    );
}

export default User;