import React, { useState, useEffect, useRef } from 'react';

import './Chat.css';
import { getApiUrl } from '../../GetApiUrl';

const Chat = () => {
    const [currentText, setCurrentText] = useState("");
    const [allMessages, setAllMessages] = useState([
        {
            sender: "ai",
            type: "message",
            message: "こんにちは！わからないことがあれば気軽に質問してください！！\\n" +
                "なるべく具体的に教えていただけると嬉しいです！"
        }]);
    const [isLoading, setIsLoading] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const chatContainerRef = useRef(null);

    const handleTextChange = (event) => { setCurrentText(event.target.value) };

    const chatSend = async (event) => {
        event.preventDefault();

        if (currentText.trim()) {
            const messages = [...allMessages];
            messages.push({
                sender: "self",
                type: "message",
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
                    await messages.push({
                        sender: "ai",
                        type: "message",
                        message: "答えが見つかりませんでした"
                    });
                    setAllMessages([...messages])
                } else {
                    await messages.push({
                        sender: "ai",
                        type: "message",
                        message: data.answers[0].answer
                    });
                    setAllMessages([...messages])

                    if (data.answers[0].dialog.prompts.length) {
                        await messages.push({
                            sender: "ai",
                            type: "prompt",
                            message: data.answers[0].dialog.prompts[0].displayText
                        });
                        setAllMessages([...messages])
                    }
                }
            } catch (e) {
                messages.push({
                    sender: "ai",
                    type: "message",
                    message: "エラーが発生しました。" + e
                });
                setAllMessages([...messages])
            }
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
            const rowClass = 'row my-2 chat-row-' + item.sender;
            if (item.type === "message") {
                const brokeMessage = item.message.split("\\n").map(msg => {
                    return (
                        <>
                            {msg}<br></br>
                        </>
                    )
                })
                messages.push(
                    <div key={"message-" + allMessages.indexOf(item)}>
                        <div className={rowClass}>
                            <div className='col-2'>
                                {item.sender === "ai"
                                    ? <img src={`${process.env.PUBLIC_URL}/image/a-logo.png`} alt="Icon" />
                                    : null}
                            </div>
                            <div className='col-10'>
                                <p>{brokeMessage}</p>
                            </div>
                        </div>
                        <div className='chat-clear' />
                    </div>
                )
            } else if (item.type === "prompt") {
                messages.push(
                    <div key={"message-" + allMessages.indexOf(item)}>
                        <div className={rowClass}>
                            <div className='col-2'>
                                {item.sender === "ai"
                                    ? <img src={`${process.env.PUBLIC_URL}/image/a-logo.png`} alt="Icon" />
                                    : null}
                            </div>
                            <div className='col-10'>
                                <p><a href={item.message}>{item.message}</a></p>
                            </div>
                        </div>
                        <div className='chat-clear' />
                    </div>
                )
            }
        })

        return messages;
    }

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    }

    return (
        <>
            <button className='chat-open-button' onClick={toggleChat}>
                {isChatOpen ? '閉じる' : 'AIチャット'}
            </button>
            {isChatOpen && (
                <div className='chat-container'>
                    <div className='chat-title'>
                        <h4>お助けチャット ACEくん</h4>
                        <button className='bi bi-x chat-close-button' onClick={toggleChat}></button>
                    </div>
                    <div className='chat-conversation container-fluid' ref={chatContainerRef}>
                        {renderMessages()}
                    </div>
                    <div className='chat-input container-fluid'>
                        <form>
                            <div className='row input-row'>
                                <div className='col-10 p-0'>
                                    <input type='text' maxlength="50" className='chat-input-text' placeholder='質問を入力してください...' value={currentText} onChange={handleTextChange} disabled={isLoading}></input>
                                </div>
                                <div className='col-2 p-0'>
                                    {isLoading ?
                                        <button type='button' className='bi bi-arrow-clockwise chat-input-button loading-icon'></button>
                                        :
                                        <button type="submit" className="bi bi-send chat-input-button" onClick={chatSend}></button>
                                    }
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default Chat;


