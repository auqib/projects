import axios from "axios";

import { Context } from "./UserContext";

import Routes from "./Routes";
import { useContext, useState } from "react";
import { useEffect } from "react";

function App() {
  // axios.defaults.baseURL = "https://achat.auqib.com/";
  // axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "https://achat.auqib.com";
  axios.defaults.withCredentials = true;

  const value = "my context value";
  const [usernameContext, setUsernameContext] = useState(null);
  const [selectedUserContext, setSelectedUserContext] = useState(null);
  
  const [id, setId] = useState(null);
  useEffect(() => {
    axios.get("/profile").then((response) => {
      setId(response.data.userId);
      setUsernameContext(response.data.username);
      // console.log(id);
    });
  }, []);

  return (
    <Context.Provider
      value={{ usernameContext, setUsernameContext, id, setId, selectedUserContext, setSelectedUserContext }}
    >
      <Routes />
    </Context.Provider>
  );
}

export default App;
