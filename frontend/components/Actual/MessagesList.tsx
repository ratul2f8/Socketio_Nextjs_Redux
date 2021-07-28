import { Avatar, List } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentMessages } from "../../redux/messages/messageSlice";
import { IReceiveIndividualMessage } from "../../redux/messages/types";
import { selectCurrentUser } from "../../redux/user/userSlice";

// const messages: IReceiveIndividualMessage[] = [
//   {
//     message: "Hello",
//     senderId: "010-692-6593 x09125",
//     senderName: "Ervin Howell",
//   },
//   {
//     message: "Hi there!",
//     senderId: "1-463-123-4447",
//     senderName: "Clementine Bauch",
//   },
//   {
//     message: "How are you",
//     senderId: "010-692-6593 x09125",
//     senderName: "Ervin Howell",
//   },
//   {
//     message: "Great! and u?",
//     senderId: "1-463-123-4447",
//     senderName: "Clementine Bauch",
//   },
// ];

const MessagesList: React.FC = () => {
  const currentUser = useSelector(selectCurrentUser);
  const currentMessages = useSelector(selectCurrentMessages);
  return (
    <div className="messages-container">
      {
          currentMessages.length === 0
          ?
          "Start Conversation"
          :
          (
              <React.Fragment>
                  {currentMessages.map((message, index) => {
        return (
          <div className="message" key={index}>
            {currentUser === message.senderId ? (
              <List.Item style={{ marginLeft: "auto", marginRight: "0.6em" }}>
                <List.Item.Meta description={message.message} />
              </List.Item>
            ) : (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={message.senderName}
                  description={message.message}
                />
              </List.Item>
            )}
          </div>
        );
      })}
              </React.Fragment>
          )
      }
    </div>
  );
};
export default MessagesList;
