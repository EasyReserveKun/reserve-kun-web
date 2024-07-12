import React, { useState, useEffect, useRef } from 'react';

import './Chat.css';
import { getApiUrl } from '../../GetApiUrl';

const Chat = () => {
    const [currentText, setCurrentText] = useState("");
    const [allMessages, setAllMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef(null);

    const handleTextChange = (event) => { setCurrentText(event.target.value) };

    const chatSend = async (event) => {
        event.preventDefault();

        if (currentText.trim()) {
            const messages = [...allMessages];
            messages.push({
                sender: "self",
                message: currentText
            });
            setAllMessages([...messages]);
            setIsLoading(true);

            try {
                const requestData = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ question: currentText })
                }
                const responce = await fetch(getApiUrl() + "/search", requestData);
                const data = await responce.json();

                if (!data.answers[0].questions.length) {
                    messages.push({
                        sender: "ai",
                        message: "答えが見つかりませんでした"
                    });
                } else {
                    messages.push({
                        sender: "ai",
                        message: data.answers[0].answer
                    });
                }
            } catch (e) {
                messages.push({
                    sender: "ai",
                    message: "エラーが発生しました。" + e
                });
            }
            setAllMessages([...messages])
            setCurrentText("");
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [allMessages]);

    const renderMessages = () => {
        const messages = [];
        allMessages.forEach((item) => {
            const messageClass = 'chat-message chat-text-' + item.sender;
            messages.push(
                <div key={allMessages.indexOf(item)}>
                    <div className={messageClass}>
                        <p>{item.message}</p>
                    </div>
                    <div className='chat-clear' />
                </div>
            )

        })
        return messages;
    }

    return (
        <>
            <div className='chat-container'>
                <div className='chat-title'>
                    <h2>AIチャット</h2>
                </div>
                <div className='chat-conversation' ref={chatContainerRef}>
                    {renderMessages()}
                </div>
                <div className='chat-input container'>
                    <form>
                        <div className='row input-row'>
                            <div className='col-10 p-0'>
                                <input type='text' className='chat-input-text' value={currentText} onChange={handleTextChange} disabled={isLoading}></input>
                            </div>
                            <div className='col-2 p-0'>{
                                isLoading ?
                                    <button type='button' className='bi bi-arrow-clockwise chat-input-button loading-icon'></button>
                                    :
                                    <button type='submit' className='bi bi-send chat-input-button' onClick={chatSend}></button>
                            }</div>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}

export default Chat;


