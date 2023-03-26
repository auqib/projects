import React, { useContext, useEffect, useState } from "react";
import Avatar from "./Avatar";
import Logo from "./Logo"
// import { UserContext } from "./UserContext"
import { Context } from "./UserContext";

const Chat = () => {
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null)
  const { usernameContext, id } = useContext(Context);
  const [newMessageText, setNewMessageText] = useState("")
  // console.log(usernameContext);
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000/test");
    setWs(ws);
    ws.addEventListener("message", handleMessage);
  }, []);
  function showOnlinePeople(peopleArray) {
    // console.log(people)
    const people = {};
    peopleArray.forEach(({ userId, username }) => {
      people[userId] = username;
    });
    setOnlinePeople(people);
  }
  function handleMessage(ev) {
    // console.log('new message', e.data)
    const messageDate = JSON.parse(ev.data);
    console.log(messageDate);
    if ("online" in messageDate) {
      showOnlinePeople(messageDate.online);
    }
  }
  const onlinePopleExcOurUser = { ...onlinePeople }
  delete onlinePopleExcOurUser[id]

  function sendMessage(ev) {
    ev.preventDefault();
    ws.send(JSON.stringify({
      message: {
        recipitent: selectedUserId,
        text: newMessageText
      }
    }))

  }
  

 

  return (
    <div className="flex h-screen">
      <div className="bg-blue-50 w-1/3 ">
        <Logo />
        {/* {usernameContext} */}
        {Object.keys(onlinePopleExcOurUser).map((userId) => (
          <div
            key={userId}
            onClick={() => setSelectedUserId(userId)}
            className={
              "border-b border-gray-400  flex  items-center gap-2 cursor-pointer " +
              (userId === selectedUserId ? "bg-blue-200" : "")
            }
          >
            {userId === selectedUserId && (
              <div className="w-1 bg-blue-500 h-12 rounded-r-md"> </div>
            )}
            <div className="flex gap-2 py-2 pl-4 items-center">
              <Avatar username={onlinePeople[userId]} userId={userId} />
              <span className="text-gray-800">{onlinePeople[userId]}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col bg-blue-200 w-2/3 p-2">
        <div className="flex-grow">
          {!selectedUserId && (
            <div className="flex h-full items-center justify-center">
              <div className="text-gray-400">
                &larr; Select a Person from the sidebar
              </div>
            </div>
          )}
        </div>
        {!!selectedUserId && (
          <form className="flex gap-2 " onSubmit={sendMessage}>
            <input
              type="text"
              value={newMessageText}
              onChange={(ev) => setNewMessageText(ev.target.value)}
              className="border flex-grow border rounded-sm p-2 "
              placeholder="Type your message here"
            />
            <button
              type="submit"
              className="bg-blue-500 p-2 text-white rounded-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Chat;
