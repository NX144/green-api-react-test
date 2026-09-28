export default function MessageItem({message, idInstance, timestampCreate}) {
    return (
        <div className={message.sender !== idInstance ? "messanger__chat-body_item" : "messanger__chat-body_item messanger__chat-body_item-my"} >
            <div className='messanger__chat-body_sms'>
                {message.text}
            </div>
            <div className="messanger__chat-body_time">{timestampCreate(message.timestamp)}</div>
        </div>
    )
}