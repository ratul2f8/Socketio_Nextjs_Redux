import { Layout } from "antd";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMessageToConversation } from "../../redux/messages/messageSlice";
import { IReceiveIndividualMessage } from "../../redux/messages/types";
import { selectSocket, SOCKET_EVENTS } from "../../redux/socket";
import MessagesList from "./MessagesList";
import SendMessageBox from "./SendMessageBox";

const ChatWindow: React.FC = () => {
    const { Header, Content, Footer } = Layout;
    const socket = useSelector(selectSocket);
    const dispatch = useDispatch();
    React.useEffect(() => {
      console.log("listening..")
      if (socket !== null) {
        socket.on(
          SOCKET_EVENTS.RECEIVE_MESSAGE,
          (payload: IReceiveIndividualMessage) => {
            console.log(payload)
            const { senderId } = payload;
            dispatch(addMessageToConversation({ key: senderId, value: payload }));
          }
        );
      }
      return () => {
        if (socket !== null) {
          socket.off(SOCKET_EVENTS.RECEIVE_MESSAGE);
        }
      };
    });
    return (
        <Layout>
            <Header
              style={{
                backgroundColor: "white",
                color: "black",
              }}>{`🚀🚀🚀Rocket Chat🚀🚀🚀`}</Header>
            <Content>
              <MessagesList/>
            </Content>
            <Footer style={{height: "10%"}}>
              <SendMessageBox/>
            </Footer>
          </Layout>
    )
}
export default ChatWindow;