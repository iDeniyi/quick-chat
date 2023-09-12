"use client";

import { Avatar, useChatContext } from "stream-chat-react";
interface ChatPreviewProps {
    channel: any;
    type?: string;
}

function ChatPreview({ channel, type }: ChatPreviewProps) {
    const { channel: activeChannel, client } = useChatContext();
    const GroupChatPreview = () => (
        <p>#{channel?.data?.name || channel?.data.id}</p>
    );
    const PersonalChatPreview = () => {
        const members = Object.values(
            channel.state.members as { [key: string]: { user: any } }
        ).filter(({ user }) => user.id !== client.userID);
        return (
            <div>
                <Avatar
                    image={members[0]?.user?.image}
                    name={members[0]?.user?.fullName}
                    size={24}
                />
                <p> name={members[0]?.user?.fullName} </p>
            </div>
        );
    };

    return (
        <div onClick={() => console.log(channel)}>
            {type === "team" ? <GroupChatPreview /> : <PersonalChatPreview />}
        </div>
    );
}

export default ChatPreview;
