import { Layout } from "antd";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useSelector } from "react-redux";
import LoginModal from "../components/LoginModal";
import { selectCurrentUser } from "../redux/user/userSlice";

export default function Home() {
  const currentUser = useSelector(selectCurrentUser);
  const router = useRouter();
  if (currentUser.length !== 0) {
    router.push("/chat");
  }
  return (
    <Layout style={{ height: "100vh", width: "100vw", flexDirection: "row" }}>
      <LoginModal />
    </Layout>
  );
}
