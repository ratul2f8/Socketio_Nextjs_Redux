import { Layout, Button } from "antd";
import Sider from "antd/lib/layout/Sider";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatWindow from "../components/Actual/ChatWindow";
import People from "../components/Actual/People";
import {
  addMessageToConversation,
  selectCurrentConversation,
} from "../redux/messages/messageSlice";
import { IReceiveIndividualMessage } from "../redux/messages/types";
import {
  closeSockets,
  initializeSockets,
  selectSocket,
  SOCKET_EVENTS,
} from "../redux/socket";
import { selectCurrentUser, resetUser } from "../redux/user/userSlice";

const ChatPage: React.FC = () => {
  const { Header, Content } = Layout;
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const currentConversation = useSelector(selectCurrentConversation);
  React.useEffect(() => {
    if (currentUser.length !== 0) {
      dispatch(initializeSockets(currentUser));
    }
    return () => {
      dispatch(closeSockets());
    };
  }, [currentUser]);
  return (
    <Layout style={{ height: "100vh", width: "100vw", flexDirection: "row" }}>
      <Sider>
        <People currentUser={currentUser} />
      </Sider>
      {currentConversation.length === 0 ? (
        <Layout>
          <Header
            style={{
              backgroundColor: "white",
              color: "black",
            }}>{`🚀🚀🚀Rocket Chat🚀🚀🚀`}</Header>
          <Content>Select a conversation to start</Content>
        </Layout>
      ) : (
        <ChatWindow />
      )}
    </Layout>
  );
};
export default ChatPage;
