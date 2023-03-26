import axios from "axios";

import { Context } from "./UserContext";

import Routes from "./Routes";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  axios.defaults.baseURL = "http://localhost:5000";
  axios.defaults.withCredentials = true;

  const value = "my context value";
  const [usernameContext, setUsernameContext] = useState(null);
  const [id, setId] = useState(null);
  useEffect(() => {
    axios.get("/profile").then((response) => {
      setId(response.data.userId);
      setUsernameContext(response.data.username)
      // console.log(id);
    });
  }, []);

  return (
    <Context.Provider
      value={{ usernameContext, setUsernameContext, id, setId }}
    >
      <Routes />
    </Context.Provider>
  );
}

export default App;
