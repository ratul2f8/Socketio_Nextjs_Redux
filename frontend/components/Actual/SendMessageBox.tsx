import Search from "antd/lib/input/Search";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentConversation,
  sendMessage,
} from "../../redux/messages/messageSlice";

const SendMessageBox: React.FC = () => {
  const [message, setMessage] = React.useState("");
  const dispatch = useDispatch();
  const currentConversation = useSelector(selectCurrentConversation);
  const handleSubmit = async () => {
    await dispatch(
      sendMessage({
        message: message,
        receiverId: currentConversation,
        senderName: "Sender",
      })
    );
    setMessage("");
  };
  return (
    <React.Fragment>
      <Search
        placeholder="Send Message"
        enterButton="Send"
        size="large"
        value={message}
        onChange={(event) => setMessage(event.target.value + "")}
        onSearch={handleSubmit}
      />
    </React.Fragment>
  );
};
export default SendMessageBox;
