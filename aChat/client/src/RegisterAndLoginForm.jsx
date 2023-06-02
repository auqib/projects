import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "./UserContext";

const RegisterAndLoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { usernameContext, setUsernameContext, id, setId } =
    useContext(Context);
  const [isLoginOrRegister, setLoginOrRegister] = useState("login");

  async function handleSubmit(ev) {
    ev.preventDefault();
    const url = isLoginOrRegister === 'register' ? 'register' : 'login';
    const { data } = await axios.post(url, { username, password });
    setUsernameContext(username);
    setId(data.id);
  }
  
  return (
    <div className="bg-blue-50  h-screen flex items-center  ">
      {/* // ---------------- FORM Start----------- */}
      <form className="w-64 mx-auto mb-12 " onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
          placeholder="username"
          className="block w-full rounded-md p-2 mb-2 border "
        />
        <input
          type="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          placeholder="password"
          className="block w-full rounded-md p-2 mb-2 border"
        />
        <button class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-full">
          {isLoginOrRegister === "register" ? "Register" : "Login"}
        </button>

        <div className="text-center mt-2">
          {isLoginOrRegister === "register" && (
            <div>
              Already a member?
              <button
                onClick={() => {
                  setLoginOrRegister("login");
                }}
              >
                Login Here
              </button>
            </div>
          )}
          {isLoginOrRegister === "login" && (
            <div>
              Dont have an account...
              <button
                onClick={() => {
                  setLoginOrRegister("register");
                }}
                class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
              >
                <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Register
                </span>
              </button>
            </div>
          )}
        </div>
      </form>
      {/* ---------------- FORM End----------- */}
    </div>
  );
};

export default RegisterAndLoginForm;
