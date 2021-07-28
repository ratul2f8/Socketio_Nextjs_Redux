import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";
import users from "../../public/data.json";
import { useDispatch } from "react-redux";
import { setCurrentConversation } from "../../redux/messages/messageSlice";

interface IProp {
  currentUser: string;
}

const People: React.FC<IProp> = ({ currentUser }) => {
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      {users
        .filter((user) => user.email !== currentUser)
        .map((user) => {
          let name = user.username;
          let fullName = user.name;
          return (
            <div
              onClick={() => dispatch(setCurrentConversation(user.email))}
              className="flex-row-centered"
              key={name}
              style={{ marginTop: "1em" }}>
              <Avatar
                style={{ margin: "0.5em" }}
                shape="square"
                size="small"
                icon={<UserOutlined />}
              />
              {fullName}
            </div>
          );
        })}
    </React.Fragment>
  );
};
export default People;
