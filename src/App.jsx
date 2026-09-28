// import { useState } from 'react'
import './App.scss'
import {useState} from "react";
import Authorization from "./components/Authorization/Authorization.jsx";
import Chats from "./Chats.jsx";
import {API_URL} from "./config.js";

function App() {
  const [idInstance, setIdInstance] = useState(() => {
    return localStorage.getItem("idInstance") || ""
  });
  const [apiTokenInstance, setApiTokenInstance] = useState(() => {
    return localStorage.getItem("apiTokenInstance") || "";
  });
  const apiUrl = API_URL;

  const [authorized, setAuthorized] = useState(() => {
    const id = localStorage.getItem("idInstance");
    const token = localStorage.getItem("apiTokenInstance");
    return !!(id && token);
  });


  const isAuthorized = () => {
    localStorage.setItem("idInstance", idInstance);
    localStorage.setItem("apiTokenInstance", apiTokenInstance);
    setAuthorized(true);
  }

  return (
      !authorized ?
          <Authorization
              idInstance={idInstance}
              setIdInstance={setIdInstance}
              apiTokenInstance={apiTokenInstance}
              setApiTokenInstance={setApiTokenInstance}
              login={isAuthorized} />
          :
          <Chats idInstance={idInstance}  apiTokenInstance={apiTokenInstance} apiUrl={apiUrl}/>
  )
}

export default App
