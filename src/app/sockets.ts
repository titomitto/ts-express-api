import { Socket, Server } from "socket.io";
import event from 'app/events';

export default (io: Server)=>{
    io.on("connection", function (socket: Socket) {
        event.on('new:user', (userName) => {
            socket.emit('name-ok', `Hello ${userName}, how have you been?`);
            socket.on('disconnect', ()=> console.log("Disconnected"));
        }); 
    });
};