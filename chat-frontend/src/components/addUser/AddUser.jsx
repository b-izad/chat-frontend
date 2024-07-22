import React, { useState } from 'react';
import './adduser.css';

const AddUser = ({ addNewUser }) => {
  const [user, setUser] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get('username');

    // Mock user data
    const mockUsers = [
      {
        id: '2',
        username: 'Jane Smith',
        avatar: './avatar.png',
      },
      {
        id: '3',
        username: 'John Doe',
        avatar: './avatar.png',
      },
    ];

    // Simulate searching for the user
    const foundUser = mockUsers.find((user) => user.username === username);

    if (foundUser) {
      setUser(foundUser);
    } else {
      setUser(null);
    }
  };

  const handleAdd = () => {
    if (user) {
      addNewUser(user.username);
      setUser(null); // Clear the selected user after adding
    }
  };

  return (
    <div className="addUser">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Username" name="username" />
        <button>Search</button>
      </form>
      {user && (
        <div className="user">
          <div className="detail">
            <img src={user.avatar || './avatar.png'} alt="" />
            <span>{user.username}</span>
          </div>
          <button onClick={handleAdd}>Add User</button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
