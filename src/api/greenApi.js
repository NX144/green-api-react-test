import {API_URL} from "../config.js";

export const receiveNotification = async (idInstance, apiTokenInstance) => {
    const url = `${API_URL}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}?receiveTimeout=10`;

    try {
        const response = await fetch(url, {
            method: "GET"
        })

        const text = await response.text();

        if(!text) return null;

        return JSON.parse(text);

    } catch (error) {
        console.error(`Ошибка метода ReceiveNotification: ${error}`);
        return null;
    }
}

export const deleteNotification = async (idInstance, apiTokenInstance, receiptId) => {
    const url = `${API_URL}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`;

    try {
        const response = await fetch(url, {
            method: "DELETE"
        })

        return await response.json();
    } catch (error) {
        console.log(`Ошибка DeleteNotification: ${error}`);
    }
}

export const sendMessage = async (idInstance, apiTokenInstance, chatId, message) => {
    const url = `${API_URL}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;

    const bodyQuery = {
        chatId,
        message
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyQuery),
        })

        return await response.json();
    }
    catch(err) {
        console.error(`Ошибка отправки: ${err}`);
        throw err;
    }
}

export const checkAccountWithNumber = async (idInstance, apiTokenInstance, phoneNumber) => {
    const url = `${API_URL}/waInstance${idInstance}/checkAccount/${apiTokenInstance}`;

    const bodyQuery = {
        phoneNumber: Number(phoneNumber),
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyQuery),
        })

        return await response.json();
    } catch(err) {
        console.error(`Ошибка проверки ID аккаунта по номеру: ${err}`);
        throw err;
    }

}