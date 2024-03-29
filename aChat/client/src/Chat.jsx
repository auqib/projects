import React, { useContext, useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { Context } from "./UserContext";
import { uniqBy } from "lodash";
import axios from "axios";
import Contact from "./Contact";
import { io } from "socket.io-client";

const Chat = () => {
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState([]);
  let [selectedUserId, setSelectedUserId] = useState(null);
  let [selectedUser, setSelectedUser] = useState(null);
  const { usernameContext, id, setUsernameContext, setId } =
    useContext(Context);
  const [newMessageText, setNewMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const divUnderMessages = useRef();
  const [offlinePeople, setOfflinePeople] = useState({});
  const [allUsers, setAllUsers] = useState({});

  var count = 0;
  //  -------------------- Sound Effects --------------------
  var receiveMessageTone = new Audio("ting.mp3");
  var sentMessageTone = new Audio("messageSent.mp3");
  var backButtonTone = new Audio("backButtonTone.mp3");
  var userOnline = new Audio("userOnline.mp3");

  useEffect(() => {
    connectToWs();
  }, [selectedUserId]);
  useEffect(() => {
    if (selectedUserId) {
      backButtonTone.play();
      axios.get("/messages/" + selectedUserId).then((res) => {
        setMessages(res.data);

        const fUsers = allUsers;

        fUsers.forEach((p) => {
          if (p._id === selectedUserId) {
            setSelectedUser(p.username);
          }
        });
      });
    }
  }, [selectedUserId]);

  function connectToWs() {
    count++;
    const ws = io(
      "wss://achat.auqib.com"
      // , {
      // // transports: ["websocket", "polling"],
      // autoConnect: false,
      // }
    );

    setWs(ws);

    ws.on("connect", () => {
      ws.emit("newUser", {
        username: usernameContext,
        userId: id,
        socketId: ws.id,
      });
    });

    ws.on("disconnect", () => {
      ws.emit("closing", "clients disconnected.");
    });

    ws.on("newUserResponse", showOnlinePeople);
    ws.on("newUsers", showOnlinePeople);

    ws.on("userOffline", showOnlinePeople);
    ws.on("messageFromOtherUsers", handleMessage);
  }

  function showOnlinePeople(peopleArray) {
    let uniqueF = [...new Map(peopleArray.map((m) => [m.userId, m])).values()];

    const people = {};
    uniqueF.forEach(({ userId, username, socketId }) => {
      people[userId] = username;
    });
    setOnlinePeople(people);
  }
  function handleMessage(ev) {
    const messageData = ev;

    console.log(messageData);
    if ("text" in messageData) {
      // console.log(selectedUserId);
      if (messageData.sender === selectedUserId) {
        console.log("sender and selected user are same");
        setMessages((prev) => [...prev, { ...messageData }]);
        receiveMessageTone.play();
      }
    }
  }

  function sendMessage(ev, file = null) {
    if (ev) ev.preventDefault();
    {
      sentMessageTone.play();
    }
    ws.emit(
      "message",
      JSON.stringify({
        userId: id,
        recipient: selectedUserId,
        text: newMessageText,
        file,
      })
    );

    if (file) {
      axios.get("/messages/" + selectedUserId).then((res) => {
        setMessages(res.data);
      });
    } else {
      setNewMessageText("");
      setMessages((prev) => [
        ...prev,
        {
          text: newMessageText,
          sender: id,
          recipient: selectedUserId,
          _id: Date.now(),
        },
      ]);
    }
  }

  useEffect(() => {
    const div = divUnderMessages.current;
    if (div) {
      div.scrollIntoView();
    }
  }, [messages]);

  useEffect(() => {
    axios.get("/people").then((res) => {
      setAllUsers(res.data);

      const offlinePeopleArr = res.data
        .filter((p) => p._id !== id)
        .filter((p) => !Object.keys(onlinePeople).includes(p._id));
      // console.log(offlinePeople);
      const offlineP = {};
      offlinePeopleArr.forEach((p) => {
        offlineP[p._id] = p;

        setOfflinePeople(offlineP);
      });
    });
  }, [onlinePeople, selectedUser]);

  function sendFile(ev) {
    const reader = new FileReader();
    reader.readAsDataURL(ev.target.files[0]);
    reader.onload = () => {};
  }

  function logout() {
    ws.emit(
      "uId",
      JSON.stringify({
        userId: ws.id,
      })
    );
    console.log("logging out");

    axios.post("/logout").then(() => {
      setId(null);
      setUsernameContext(null);

      ws.disconnect();

      console.log("user disconnected");
    });
  }
  function back() {
    backButtonTone.play();
    setSelectedUserId(null);
    setSelectedUser(null);
  }
  const onlinePopleExcOurUser = { ...onlinePeople };

  delete onlinePopleExcOurUser[id];

  const noDuplicateMessages = uniqBy(messages, "_id");

  return (
    // Chat homepage
    <div className="flex h-screen">
      {/*  -------  list of all users in the database */}

      {!selectedUserId && (
        <div className=" bg-blue-100  w-full">
          <div className="flex-grow overflow-y-scroll">
            <Logo />

            {Object.keys(onlinePopleExcOurUser).map((userId) => (
              <Contact
                key={userId}
                id={userId}
                online={true}
                username={onlinePopleExcOurUser[userId]}
                onClick={() => {
                  setSelectedUserId(userId);
                }}
                selected={userId === selectedUserId}
              />
            ))}

            {Object.keys(offlinePeople).map((userId) => (
              <Contact
                key={userId}
                id={userId}
                online={false}
                username={offlinePeople[userId].username}
                onClick={() => {
                  setSelectedUserId(userId);
                }}
                selected={userId === selectedUserId}
              />
            ))}
          </div>

          <div className="p-2 text-center flex items-center justify-center">
            <span className="mr-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>

              {usernameContext}
            </span>
            <button
              onClick={logout}
              className="bg-blue-500 text-white py-1 px-2 border rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* ---------- chat messages */}

      {selectedUserId && (
        <div className="flex flex-col bg-blue-200 w-full p-2">
          <div className="bg-blue-600 w-full h-10 text-xl font-bold text-white text-center">
            aChat Application
          </div>
          <div className="bg-blue-600 w-full h-10">
            <div className="flex sticky top-0">
              <button
                onClick={back}
                className="bg-blue-300 hover:bg-blue-600 text-gray-800 font-bold py-2 px-4 rounded-l"
              >
                Back
              </button>
              <p className="text-xl font-bold text-white ml-3 mt-1">
                {selectedUser}
              </p>
            </div>
          </div>
          <div className="flex-grow">
            {/* {!selectedUserId && (
              <div className="flex h-full items-center justify-center">
                <div className="text-gray-400">
                  &larr; Select a Person from the sidebar
                </div>
              </div>
            )} */}
            {selectedUserId && (
              <div className="w-full relative h-full">
                <div className="overflow-y-scroll absolute top-0 left-0 right-0 bottom-2">
                  {noDuplicateMessages.map((message) => (
                    <div
                      key={message._id}
                      className={
                        message.sender === id ? "text-right" : "text-left"
                      }
                    >
                      <div
                        className={
                          "text-left inline-block p-2 my-2 rounded-lg text-sm " +
                          (message.sender === id
                            ? "bg-blue-500 text-white"
                            : "bg-white text-gray-500")
                        }
                      >
                        {message.text}

                        {message.file && (
                          <div>
                            <a
                              target="_blank"
                              className="flex items-center gap-1 border-b"
                              href={
                                axios.defaults.baseURL +
                                "/uploads/" +
                                message.file
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-4 h-4"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M18.97 3.659a2.25 2.25 0 00-3.182 0l-10.94 10.94a3.75 3.75 0 105.304 5.303l7.693-7.693a.75.75 0 011.06 1.06l-7.693 7.693a5.25 5.25 0 11-7.424-7.424l10.939-10.94a3.75 3.75 0 115.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 015.91 15.66l7.81-7.81a.75.75 0 011.061 1.06l-7.81 7.81a.75.75 0 001.054 1.068L18.97 6.84a2.25 2.25 0 000-3.182z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              {message.file}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={divUnderMessages}> </div>
                </div>
              </div>
            )}
          </div>
          {!!selectedUserId && (
            <form className="flex gap-2 p-2 " onSubmit={sendMessage}>
              <input
                type="text"
                value={newMessageText}
                onChange={(ev) => setNewMessageText(ev.target.value)}
                className="border flex-grow  rounded-2xl p-2 "
                placeholder="Type your message here"
              />
              {/* <label
              type="button"
              className="bg-blue-200 p-2 text-black rounded-sm border border-gray-500 cursor-pointer"
            >
              <input type="file" className="hidden" onChange={sendFile} />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M18.97 3.659a2.25 2.25 0 00-3.182 0l-10.94 10.94a3.75 3.75 0 105.304 5.303l7.693-7.693a.75.75 0 011.06 1.06l-7.693 7.693a5.25 5.25 0 11-7.424-7.424l10.939-10.94a3.75 3.75 0 115.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 015.91 15.66l7.81-7.81a.75.75 0 011.061 1.06l-7.81 7.81a.75.75 0 001.054 1.068L18.97 6.84a2.25 2.25 0 000-3.182z"
                  clipRule="evenodd"
                />
              </svg>
            </label> */}
              <button
                type="submit"
                className="bg-blue-500 p-2 text-white rounded-full"
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
      )}
    </div>
  );
};

export default Chat;
