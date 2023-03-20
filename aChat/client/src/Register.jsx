import React, { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
      <div className="bg-blue-50 h-screen flex items-center">
          
      {/* // ---------------- FORM Start----------- */}
      <form className="w-64 mx-auto mb-12">
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
          Login
        </button>
      </form>
      {/* ---------------- FORM End----------- */}
    </div>
  );
};

export default Register;
