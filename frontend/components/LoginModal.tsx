import { Button, Input, Modal } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import users from "../public/data.json";
import { setCurrentUser } from "../redux/user/userSlice";

const LoginModal: React.FC = () => {
  const dispatch = useDispatch();
  const possibleEmails = users.map((user) => user.email);
  const [value, setValue] = React.useState("Shanna@melissa.tv");
  const handleSubmit = () => {
    const { email="" } = users.find(user => user.email === value);
    if(email.length !== 0){
        dispatch(setCurrentUser(email));
    }
  };
  return (
    <React.Fragment>
      <Modal
        title="Start messaging"
        visible={true}
        closable={false}
        footer={[
          <Button
            onClick={handleSubmit}
            disabled={!possibleEmails.includes(value)}>
            Enter
          </Button>,
        ]}>
        <Input
          placeholder="enter your email"
          value={value}
          type="email"
          onChange={(event) => setValue(event.target.value + "")}
        />
      </Modal>
    </React.Fragment>
  );
};
export default LoginModal;
