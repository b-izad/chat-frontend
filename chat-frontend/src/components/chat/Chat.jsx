import React, { useEffect, useRef, useState } from 'react';
import './chat.css';
import EmojiPicker from 'emoji-picker-react';

const Chat = () => {
    const [chat, setChat] = useState({ messages: [] });
    const [open, setOpen] = useState(false);
    const [text, setText] = useState('');
    const [img, setImg] = useState({ file: null, url: '' });
    const [currentUser] = useState({
        id: '1',
        username: 'Current User',
        avatar: './avatar.png',
    });
    const [user] = useState({
        id: '2',
        username: 'Jane Smith',
        avatar: './avatar.png',
    });

    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chat]);

    const handleEmoji = (e) => {
        setText(`${text}${e.emoji}`);
        setOpen(false);
    };

    const handleImg = (e) => {
        if (e.target.files[0]) {
            setImg({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0]),
            });
        }
    };

    const handleSend = () => {
        if (text === '') return;

        const newMessage = {
            senderId: currentUser.id,
            text,
            createdAt: new Date(),
            ...(img.file && { img: img.url }),
        };

        setChat((prevChat) => ({
            ...prevChat,
            messages: [...prevChat.messages, newMessage],
        }));

        setImg({ file: null, url: '' });
        setText('');
    };

    return (
        <div className="chat">
            <div className="top">
                <div className="user">
                    <img src={user.avatar || './avatar.png'} alt="" />
                    <div className="texts">
                        <span>{user.username}</span>
                        <p>random text here, hello world</p>
                    </div>
                </div>
                <div className="icons">
                    <img src="./phone.png" alt="" />
                    <img src="./video.png" alt="" />
                    <img src="./info.png" alt="" />
                </div>
            </div>
            <div className="center">
                {chat.messages.map((message, index) => (
                    <div
                        className={message.senderId === currentUser.id ? 'message own' : 'message'}
                        key={index}
                    >
                        <div className="texts">
                            {message.img && <img src={message.img} alt="" />}
                            <p>{message.text}</p>
                            <span>{message.createdAt.toLocaleTimeString()}</span>
                        </div>
                    </div>
                ))}
                {img.url && (
                    <div className="message own">
                        <div className="texts">
                            <img src={img.url} alt="" />
                        </div>
                    </div>
                )}
                <div ref={endRef}></div>
            </div>
            <div className="bottom">
                <div className="icons">
                    <label htmlFor="file">
                        <img src="./img.png" alt="" />
                    </label>
                    <input type="file" id="file" style={{ display: 'none' }} onChange={handleImg} />
                    <img src="./camera.png" alt="" />
                    <img src="./mic.png" alt="" />
                </div>
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <div className="emoji">
                    <img src="./emoji.png" alt="" onClick={() => setOpen(!open)} />
                    {open && (
                        <div className="picker">
                            <EmojiPicker onEmojiClick={handleEmoji} />
                        </div>
                    )}
                </div>
                <button className="sendButton" onClick={handleSend}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
