import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";

const apikey = "4y24rrur8sbu";
const client = StreamChat.getInstance(apikey);
function App() {
    return (
        <div className="app_wrapper">
            <Chat client={client} theme="team light"></Chat>
        </div>
    );
}

export default App;
