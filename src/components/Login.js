import { useState } from "react";
const Login = (props) => {
  const [accontName, setAccountName] = useState(""); //for displaying on UI
  const [account, setAccount] = useState({}); //get account object from api and save

  const inputNameHandler = (event) => {
    setAccountName(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    try {
      loginUser();
      props.updateLoginHandler(true);
      props.accountNameUpdater(accontName);
      props.accountHandler(account);
    } catch (error) {
      console.log(error);
    }
  };

  const loginUser = async () => {
    await fetch(
      `https://localhost:44355/api/User/Login?accountName=${accontName}`
    )
      .then((res) => {
        if (res.status === 404) {
          alert("can't find account");
          return Promise.reject("error 404");
        }
        if (res.status === 400) {
          alert("400 error");
          return Promise.reject("error 400");
        }
        return res.json();
      })
      .then((data) => {
        //update status in app.js
        setAccount(data);
        localStorage.setItem("isLogged", true); //save login status to browser
      });
  };

  return (
    <div className="container" style={{ margin: "100px auto" }}>
      <form
        className="card"
        style={{ width: "50%", margin: "100px auto" }}
        onSubmit={submitHandler}
      >
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Login</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter account name"
            style={{ width: "80%", margin: "10px auto" }}
            value={accontName}
            onChange={inputNameHandler}
          />
          <small id="emailHelp" className="form-text text-muted">
            Login with account name.
          </small>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: "50%", margin: "10px auto" }}
        >
          Login
        </button>
      </form>

      <div className="alert alert-warning" role="alert">
        if you don't have an account, hit this button
        <button className="btn btn-primary" onClick={()=>{window.location.reload(true);}}>new user</button>
      </div>
    </div>
  );
};

export default Login;
