export default function MessageInput({setMessage, handleKeyDown, messageRef, submitMessage}) {
    return (
        <div className='messanger__chat-contact'>
            <div className="messanger__chat-contact_left">
                <div onInput={(e) => setMessage(e.target.textContent)} onKeyDown={handleKeyDown} contentEditable ref={messageRef} data-text="Сообщение" type="text" className="messanger__chat-mess"></div>
                {/* <textarea onKeyUp={handleKeyDown} maxlength="2000" placeholder='Введите сообщение...' type="text" className="messanger__chat-mess" /> */}
            </div>
            <button onClick={submitMessage} className='messanger__chat-arrow'>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="14" cy="14" r="14" fill="#3369F3"/>
                    <rect x="8" y="13.2" width="11" height="1.6" fill="white"/>
                    <path d="M15 9L19 14L15 19" stroke="#E2E2E4" strokeWidth="1.6"/>
                </svg>
            </button>
        </div>
    )
}