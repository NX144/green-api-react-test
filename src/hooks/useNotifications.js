import {useEffect} from "react";
import { receiveNotification, deleteNotification } from "../api/greenApi";

export const useNotifications = (idInstance, apiTokenInstance, setMessages, setChats) => {
    useEffect(() => {

        if(!idInstance || !apiTokenInstance) return;

        let isActiveListening = true;

        const listen = async () => {
            while (isActiveListening) {
                const notification = await receiveNotification(idInstance, apiTokenInstance);

                if(!notification) {
                    await new Promise(resolve => setTimeout(resolve, 300)); // Пауза
                    continue;
                }

                if(notification.body?.typeWebhook === "incomingMessageReceived") {

                    const text = notification.body.messageData?.textMessageData?.textMessage
                    const sender = notification.body.senderData?.senderName;
                    const chatId = notification.body.senderData?.chatId;
                    const timestamp = Date.now();

                    const newMessage = {
                        id: notification.body.idMessage,
                        text,
                        sender,
                        chatId,
                        timestamp,
                        type: "incoming"
                    }

                    if(text) {
                        setMessages(prev => [...prev, newMessage]);
                        setChats(prev => {
                            const existingChat = prev.find(chat => chat.chatId === chatId);
                            if(!existingChat) {
                                return [...prev, {
                                    chatId,
                                    name: sender,
                                    lastMessage: text,
                                    timestamp
                                }];
                            } else {
                                return prev.map(chat => (
                                    chat.chatId === chatId ? {...chat, lastMessage: text, timestamp} : chat
                                ))
                            }
                        });
                    }

                }

                if(notification.receiptId) {
                    await deleteNotification(idInstance, apiTokenInstance, notification.receiptId);
                }

                await new Promise(resolve => setTimeout(resolve, 300)); // Пауза
            }
        }

        listen();

        return () => isActiveListening = false;
    }, [idInstance, apiTokenInstance])
}