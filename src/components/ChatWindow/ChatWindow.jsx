import MessageList from "./MessageList.jsx";
import MessageInput from "./MessageInput.jsx";

export default function ChatWindow({activeChat, chats, handleKeyDown, messages, idInstance, timestampCreate, setMessage, submitMessage, messageRef}) {
    return (
        <div className='messanger__chat'>
            <div className='messanger__chat-info'>
                <div className="messanger__chat-person">
                    {!activeChat ? null :
                        <div className='messanger__round messanger__chat-round'>
                            <img src='icons/round-2.jpg' alt='round' className='messanger__img'></img>
                        </div>
                    }
                    <div className='messanger__chat-title'>
                        {!activeChat ? "Чат не выбран" : chats.find(chat => chat.chatId === activeChat)?.name || "Чат не выбран"}
                    </div>
                </div>
            </div>
            <MessageList
                messages={messages}
                activeChat={activeChat}
                idInstance={idInstance}
                timestampCreate={timestampCreate}
            />
            {!activeChat ? null :
                <MessageInput
                    setMessage={setMessage}
                    handleKeyDown={handleKeyDown}
                    messageRef={messageRef}
                    submitMessage={submitMessage}
                />
            }
        </div>
    )
}