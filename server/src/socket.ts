import { Server, Socket } from "socket.io";
import log from "./logger";

interface ISendIndividualMessage{
    message: string;
    receiverId: string;
    senderName: string;
}
interface IReceiveIndividualMessage{
    message: string;
    senderId: string;
    senderName: string;   
}

const EVENTS = {
    "CONNECTION": "connection",
    "RECEIVE_MESSAGE": "receive-message",
    "SEND_MESSAGE": "send-message"
}
export default function socket({ io } : { io: Server}){
    io.on(EVENTS.CONNECTION, (socket: Socket) => {
        const terminal = socket.handshake.query.id + "";
        socket.join(terminal);
        //log.info(terminal);
        
        //const connectedUsers = Object.keys(io.engine["clients"]).toString();
        //log.info(`Users connected with socket_id of : ${connectedUsers}`);

        //actual socket events
        socket.on(EVENTS.SEND_MESSAGE, (payload: ISendIndividualMessage) => {
            const { receiverId, senderName, message } = payload;
            const emitPayload :IReceiveIndividualMessage = {
                message: message,
                senderId: terminal,
                senderName: senderName
            };
            log.info(JSON.stringify(emitPayload));
            io.to(receiverId).emit(EVENTS.RECEIVE_MESSAGE, emitPayload);
        })
    })
}