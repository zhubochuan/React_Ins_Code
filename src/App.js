import { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login.js";
import MainPage from "./components/MainPage.js";

function App() {
  const [isLoggedin, setLoggedIn] = useState("false");
  const [accontName, setAccountName] = useState(""); //account name
  const [account, setAccount] = useState({}); //save account info

  useEffect(() => {
    //get login status from localStorage
    setLoggedIn(localStorage.getItem("isLogged"));
  }, []);

  const updateLogin = (input)=>{
    setLoggedIn(input);
  }

  const navAccountNameHandler=(name)=>{
    setAccountName(name);
  }

  const AccountInfoHandler=(input)=>{
    setAccount(input);
  }
  return <div className="App">{!isLoggedin ? <Login updateLoginHandler = {updateLogin} accountNameUpdater={navAccountNameHandler} accountHandler={AccountInfoHandler}/> 
  :
   <MainPage account_name ={accontName} updateStatus= {updateLogin} account = {account}/>}</div>;
}

export default App;
