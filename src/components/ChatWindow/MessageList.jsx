import MessageItem from "./MessageItem.jsx";

export default function MessageList({messages, activeChat, idInstance, timestampCreate}) {
    return (
        <div className='messanger__chat-body'>
            {messages.map((message) => {
                if(message.chatId === activeChat) {
                    return (
                        <MessageItem
                            key={message.id}
                            message={message}
                            idInstance={idInstance}
                            timestampCreate={timestampCreate}
                        />
                    )
                }
            })}
        </div>
    )
}