import React, { useState, useEffect } from 'react';
import './chatlist.css';
// import AddUser from './addUser/AddUser';
import AddUser from '../../addUser/AddUser';

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);
  const [input, setInput] = useState('');
  const [currentUser, setCurrentUser] = useState({
    id: '1',
    username: 'Current User',
    avatar: './avatar.png',
    blocked: [],
  });

  // Mock data
  const mockChats = [
    {
      chatId: '1',
      receiverId: '2',
      isSeen: false,
      lastMessage: 'Hello!',
      updatedAt: new Date(),
      user: {
        id: '2',
        username: 'Jane Smith',
        avatar: './avatar.png',
        blocked: [],
      },
    },
    {
      chatId: '2',
      receiverId: '3',
      isSeen: true,
      lastMessage: 'How are you?',
      updatedAt: new Date(),
      user: {
        id: '3',
        username: 'John Doe',
        avatar: './avatar.png',
        blocked: [],
      },
    },
  ];

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      const chatData = mockChats.map((item) => ({
        ...item,
        user: item.user,
      }));

      setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
    };

    fetchData();
  }, []);

  const handleSelect = (chat) => {
    const updatedChats = chats.map((item) => {
      if (item.chatId === chat.chatId) {
        return { ...item, isSeen: true };
      }
      return item;
    });

    setChats(updatedChats);
    console.log('Selected chat:', chat.chatId, chat.user);
  };

  const filteredChats = chats.filter((c) =>
    c.user.username.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="" />
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <img
          src={addMode ? './minus.png' : './plus.png'}
          alt=""
          className="add"
          onClick={() => setAddMode(!addMode)}
        />
      </div>
      {filteredChats.map((chat) => (
        <div
          className="item"
          key={chat.chatId}
          onClick={() => handleSelect(chat)}
          style={{
            backgroundColor: chat?.isSeen ? 'transparent' : '#5183fe',
          }}
        >
          <img
            src={
              chat.user.blocked.includes(currentUser.id)
                ? './avatar.png'
                : chat.user.avatar || './avatar.png'
            }
            alt=""
          />
          <div className="texts">
            <span>
              {chat.user.blocked.includes(currentUser.id)
                ? 'User'
                : chat.user.username}
            </span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}

      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
