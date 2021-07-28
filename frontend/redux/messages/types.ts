export interface ISendIndividualMessage{
    message: string;
    receiverId: string;
    senderName: string;
}
export interface IReceiveIndividualMessage{
    message: string;
    senderId: string;
    senderName: string;   
}