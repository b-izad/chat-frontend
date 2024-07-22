import React, { useState, useEffect } from "react";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import Login from "./components/login/Login";
// import Notifications from "./components/Notifications/Notifications";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [chatId, setChatId] = useState(null);

  useEffect(() => {
    // Simulate a user authentication check
    const mockAuthCheck = () => {
      setIsLoading(true);
      setTimeout(() => {
        const user = { id: "mock-id", name: "John Doe" }; // Simulate a logged-in user
        setCurrentUser(user);
        setIsLoading(false);
      }, 1000); // Simulate loading delay
    };

    mockAuthCheck();
  }, []);

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      {currentUser ? (
        <>
          <List setChatId={setChatId} />
          {chatId && <Chat />}
          {chatId && <Detail />}
        </>
      ) : (
        <Login setCurrentUser={setCurrentUser} />
      )}
      {/* <Notifications /> */}
    </div>
  );
};

export default App;
