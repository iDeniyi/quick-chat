"use client";

import React from "react";

interface ChatListProps {
    children?: React.ReactNode;
    error?: any;
    loading?: boolean;
    type?: string;
}

const ChatList = ({
    children,
    error = false,
    loading,
    type,
}: ChatListProps) => {
    if (error) {
        return type === "team" ? (
            <div>
                <p>Connection error, please try again.</p>
            </div>
        ) : null;
    }
    if (loading) {
        return (
            <div>
                <p>{type === "team" ? "Channels" : "Messages"} loading...</p>
            </div>
        );
    }
    return (
        <div>
            <div>
                <p>{type === "team" ? "Channels" : "Direct Messages"}</p>
            </div>
            {children}
        </div>
    );
};

export default ChatList;
