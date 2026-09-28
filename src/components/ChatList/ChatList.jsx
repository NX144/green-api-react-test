import ChatListItem from "./ChatListItem.jsx";

export default function ChatList({createChatByPhone, setPhone, chats, isActiveChat, timestampCreate}) {

    return (
        <div className='messanger__chat-block'>
            <div className="messanger__chat-header">
                <p className='messanger__profile'>
                    Чаты
                </p>
                <input
                    placeholder='Найти по номеру'
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                    className='messanger__search'
                />
                <button onClick={() => createChatByPhone()} className='messanger__chat-arrow messanger__chat-arrow-search'>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="14" cy="14" r="14" fill="#3369F3"/>
                        <rect x="8" y="13.2" width="11" height="1.6" fill="white"/>
                        <path d="M15 9L19 14L15 19" stroke="#E2E2E4" strokeWidth="1.6"/>
                    </svg>
                </button>
            </div>
            <div className="messanger__chat-messages">
                {

                    chats.length < 1 ? <p className="messanger__null">Чатов нет</p>
                        : (
                            <>
                                {chats.map((chat) => (
                                    <ChatListItem
                                        key={chat.chatId}
                                        chat={chat}
                                        isActiveChat={isActiveChat}
                                        timestampCreate={timestampCreate}
                                    />
                                ))}
                            </>
                        )
                }

            </div>
        </div>
    )
}