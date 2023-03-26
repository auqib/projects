import React, { useState, useContext, useEffect } from "react";
import Chat from "./Chat";
import RegisterAndLoginForm from "./RegisterAndLoginForm";
import { Context } from "./UserContext";

const Routes = () => {
  const { usernameContext } = useContext(Context);
  if (usernameContext) {
    return <Chat/>
  }
  return <RegisterAndLoginForm />;
};

export default Routes;
