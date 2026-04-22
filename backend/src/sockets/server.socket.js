import {Server} from 'socket.io';

let io;

export const initSocketServer = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: '*',
            Credentials: true
        }
    });
    console.log("Socket io server is running.....")
    io.on('connection', (socket) => {
        console.log('A user connected: ' + socket.id);
    });

}

export const getIO = () => {
    if (!io) {
        throw new Error('Socket server not initialized');
    }
    return io;
}
