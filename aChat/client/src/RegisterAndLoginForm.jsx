import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "./UserContext";

const RegisterAndLoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { usernameContext, setUsernameContext, id, setId } =
    useContext(Context);
  const [isLoginOrRegister, setLoginOrRegister] = useState("register");

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
        <button className="bg-blue-500 text-white block w-full rounded-md p-2">
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
              >
                Register
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
