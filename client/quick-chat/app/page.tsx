"use client";

import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
//components
import ChatArea from "./components/ChatArea";
import ChatListContainer from "./components/ChatListContainer/ChatListContainer";
import SideBar from "./components/SideBar/SideBar";
//css
import styles from "./Home.module.css";
import Auth from "./components/Auth/Auth";

const cookies = new Cookies();
const apiKey = "4y24rrur8sbu";
const client = StreamChat.getInstance(apiKey);
const authToken = cookies.get("token");

if (authToken) {
    client.connectUser(
        {
            id: cookies.get("userId"),
            name: cookies.get("username"),
            fullName: cookies.get("fullName"),
            hashedPassword: cookies.get("hashedPassword"),
            phoneNumber: cookies.get("phoneNumber"),
        },
        authToken
    );
}
export default function Home() {
    if (!authToken) return <Auth />;
    return (
        <div className={styles.mainContainer}>
            <SideBar />
            <Chat client={client} theme="team light">
                <ChatListContainer />
                <ChatArea />
            </Chat>
        </div>
    );
}
