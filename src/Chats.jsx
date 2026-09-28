import './App.scss'
import {useState, useRef} from "react";
import timestampCreate from "./utils/formatTimestamp.js";
import {sendMessage, checkAccountWithNumber} from "./api/greenApi";
import {useNotifications} from "./hooks/useNotifications.js";
import ChatList from "./components/ChatList/ChatList.jsx";
import ChatWindow from "./components/ChatWindow/ChatWindow.jsx";


export default function Chats({idInstance, apiTokenInstance}) {

    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const messageRef = useRef(null);

    const [messages, setMessages] = useState([]);
    const [chats, setChats] = useState([]);
    const [activeChat, setActiveChat] = useState();

    useNotifications(idInstance, apiTokenInstance, setMessages, setChats);

    const submitMessage = async () => {
        if(!activeChat) return;
        if(!message.trim()) return;

        try {
            const data = await sendMessage(idInstance, apiTokenInstance, activeChat, message);

            if(data?.idMessage) {

                const timestamp = Date.now();

                const newMessage = {
                    id: data.idMessage,
                    sender: idInstance,
                    text: message,
                    chatId: activeChat,
                    timestamp,
                    type: "outgoing"
                }

                setMessages(prev => [...prev, newMessage]);

                setChats(prev => prev.map(chat => (
                    chat.chatId === activeChat ? {...chat, lastMessage: message, timestamp} : chat
                )));

                if (messageRef.current) {
                    messageRef.current.textContent = "";
                }
                setMessage("");
            } else {
                console.log(`Ошибка отправки: ${data}`)
            }
        } catch (err) {
            console.error(`Ошибка: ${err}`)
        }
    }


    const createChatByPhone = async () => {
        if(!phone.trim()) return;

        const cleanPhone = phone.replace(/\D/g, "");

        const phoneFindResult = await checkAccountWithNumber(idInstance, apiTokenInstance, cleanPhone);

        if (!phoneFindResult?.exist || !phoneFindResult?.chatId) {
            alert("Аккаунта в MAX на этот номер нет!");
            return;
        }

        const chatId = await phoneFindResult.chatId;

        const chatExists = chats.find(chat => chat.chatId === chatId);

        if(chatExists) {
            setActiveChat(chatExists.chatId)
        } else {
            const newChat = {
                chatId,
                name: cleanPhone,
                lastMessage: "Сообщений пока нет...",
                timestamp: Date.now(),
            }

            setChats(prev => [...prev, newChat]);
            setActiveChat(chatId)
        }
        setPhone("");
    }

    const handleKeyDown = (e) => {
        if(e.key !== "Enter") return
        if (e.metaKey || e.ctrlKey) {
            e.preventDefault();
            document.execCommand("insertLineBreak");
            return;
        }

        e.preventDefault();
        submitMessage();
    }

    return (
        <>
            <div className='messanger'>
                <ChatList
                    createChatByPhone={createChatByPhone}
                    setPhone={setPhone}
                    chats={chats}
                    isActiveChat={setActiveChat}
                    timestampCreate={timestampCreate}
                />
                <ChatWindow
                    activeChat={activeChat}
                    chats={chats}
                    handleKeyDown={handleKeyDown}
                    messages={messages}
                    idInstance={idInstance}
                    timestampCreate={timestampCreate}
                    setMessage={setMessage}
                    submitMessage={submitMessage}
                    messageRef={messageRef}
                />
            </div>
        </>
    )
}