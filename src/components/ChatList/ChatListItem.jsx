export default function ChatListItem({chat, isActiveChat, timestampCreate}) {
    return (
        <div onClick={() => isActiveChat(chat.chatId)} className='messanger__item'>
            <div className='messanger__item-left'>
                <div className='messanger__round'>
                    <img src='icons/round-2.jpg' alt='round' className='messanger__img'></img>
                </div>
                <div className='messanger__descr'>
                    <div  className='messanger__title'>{chat.name}</div>
                    <div className='messanger__subtitle'>{chat.lastMessage}</div>
                </div>
            </div>
            <div className='messanger__item-right'>
                <div className='messanger__time'>{timestampCreate(chat.timestamp)}</div>
                {/*{messCount !== undefined ? <div className='messanger__count'>{messCount}</div> : null}*/}
            </div>
        </div>
    )
}