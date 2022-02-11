import React from "react";
import socketio from "socket.io-client";

//TODO - Make these environment variables or something
const SOCKET_URL = (process.env.NODE_ENV === "production") ? "https://erau-interplanet-host.herokuapp.com/" : "http://localhost:5001/";

export const socket = socketio.connect(SOCKET_URL, {
    withCredentials: false,
    closeOnBeforeunload: false
});
export const SocketContext = React.createContext();