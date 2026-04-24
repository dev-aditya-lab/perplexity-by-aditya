import { io } from 'socket.io-client';

export const initializeSocketConnection = () => {
    const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5000",{
        withCredentials: true,
    });
    socket.on('connect', () => {
        console.log('Connected to socket server with id: ' + socket.id);
    });
} 