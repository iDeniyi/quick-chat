"use client";

import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";
// components
import ChatSearch from "../ChatSearch/ChatSearch";
import ChatList from "../ChatList/ChatList";
import ChatPreview from "../ChatPreview/ChatPreview";
// css
import styles from "./ChatListContainer.module.css";

function ChatListContainer() {
    return (
        <div className={styles.chatListContainer}>
            <h3 className={styles.header}>Quick Chat</h3>
            <ChatSearch />
            <ChannelList
                filters={{}}
                List={(listProps) => <ChatList {...listProps} type="team" />}
                Preview={(previewProps) => (
                    <ChatPreview {...previewProps} type="team" />
                )}
            />
            <ChannelList
                filters={{}}
                List={(listProps) => (
                    <ChatList {...listProps} type="messaging" />
                )}
                Preview={(previewProps) => (
                    <ChatPreview {...previewProps} type="messaging" />
                )}
            />
        </div>
    );
}

export default ChatListContainer;
