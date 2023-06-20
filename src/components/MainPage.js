import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const MainPage = (props) => {
  const [show, setShow] = useState(false); //floating window for checking notes
  const [showAddingNote, setShowAddingNote] = useState(false); //floating window for adding notes
  const [showAddingAccount, setShowAddingAccount] = useState(false); //floating window for adding account
  const [showUpdatingAccount, setshowUpdatingAccount] = useState(false); //floating window for update account
  const [accounts, setAccounts] = useState([]); //all accounts
  const [selectedAccountNotes, setSelectedAccountNotes] = useState([]); //selcted account notes
  const [content, setContent] = useState(''); //note content
  const [accountId, setAccountId] = useState(''); //account id for adding note
  const [addAccountName, setaddAccountName] = useState(''); //account name for adding account
  const [updateAccountName, setUpdateAccountName] = useState(''); //account name for updating account
  


  useEffect(() => {
    getAllAccounts();
  }, []);

  const handleClose = () => setShow(false);
  const addingNotehandleClose = () => setShowAddingNote(false);
  const addingAccounthandleClose = () => setShowAddingAccount(false);
  const updateAccounthandleClose = () => setshowUpdatingAccount(false);

  const logoutHandler = () => {
    localStorage.setItem("isLogged", false);
    props.updateStatus(false); //update status in App.js
  };

  //get all existing accounts
  const getAllAccounts = async () => {
    await fetch("https://localhost:44355/api/User/GetAllUsers")
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
        setAccounts(data);
      });
  };

  //check notes
  const noteHandler = (userId) => {
    findAccountNoteById(userId);
    setShow(true);
  };

  //add note to user
  const addNoteHandler = (userId) => {
    setShowAddingNote(true);
    setAccountId(userId);
  };

   //update account
   const updateAccountHandler = (userId) => {
    setshowUpdatingAccount(true);
    setAccountId(userId);
  };
 
  //adding note
  const subumitNoteHandler=()=>{
    addingNoteToUser(accountId);
    addingNotehandleClose();
  }

  const inputNameHandler=(event)=>{
    setContent(event.target.value);
  }

  const handleAddingName=(event)=>{
    setaddAccountName(event.target.value);
  }

  const handleupdatingName=(event)=>{
    setUpdateAccountName(event.target.value);
  }


  //adding note to user
  const addingNoteToUser =async (id)=>{
    await fetch('https://localhost:44355/api/User/AddNote',
    {
        method: 'POST',
        body: JSON.stringify({
            "userId": id,
            "content": content
        }),
        headers: { 'Content-Type': 'application/json' },
    })
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
      console.log(data);
    });
  };

  //find account by id
  const findAccountNoteById = async (id) => {
    await fetch(`https://localhost:44355/api/User/GetNotesByUser?userId=${id}`)
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
        console.log(data);
        setSelectedAccountNotes(data);
      });
  };

  //add account
  const addAccountHandler= ()=>{
    setShowAddingAccount(true);
  }

  
  //submit updating account
  const submitUpdateAccountHandler=()=>{
    console.log(accountId);
    updateAccount(updateAccountName);
  }

  const updateAccount =async (inputName)=>{ //test
    await fetch('https://localhost:44355/api/User/UpdateAccountName',
    {
        method: 'POST',
        body: JSON.stringify({
            "id":accountId,
            "userName": inputName
        }),
        headers: { 'Content-Type': 'application/json' },
    })
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
      console.log(data);
    });
  };

  //submit adding account
  const submitAccountHandler=()=>{
    addAccount(addAccountName);
  }

  //call adding account api
  const addAccount =async (inputName)=>{
    await fetch('https://localhost:44355/api/User/CreateUser',
    {
        method: 'POST',
        body: JSON.stringify({
            "userName": inputName
        }),
        headers: { 'Content-Type': 'application/json' },
    })
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
      console.log(data);
    });
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        style={{ padding: "10px 25px" }}
      >
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
            <button
                type="button"
                className="btn btn-primary"
                onClick={addAccountHandler}
                style={{margin:"0 10px"}}
              >
                Add account
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className="btn btn-danger"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container" style={{ margin: "50px auto" }}>
        {props.account_name && <h3>you are {props.account_name}</h3>}
        <ul className="list-group">
          <li className="list-group-item active">All Accounts</li>
          {accounts.map((ac) => (
            <li className="list-group-item" key={ac.id}>
              {ac.userName}{" "}
              <Button
                variant="btn btn-outline-info"
                onClick={() => noteHandler(ac.id)}
                style={{margin:"0 9px"}}
              >
                check notes
              </Button>
              <Button
                variant="btn btn-outline-info"
                onClick={() => addNoteHandler(ac.id)}
                style={{margin:"0 9px"}}
              >
                Add notes
              </Button>
              <Button
                variant="btn btn-outline-info"
                onClick={() => updateAccountHandler(ac.id)}
              >
                update account
              </Button>
            </li>
          ))}
        </ul>
      </div>
      {/* floating window for checking notes*/}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            All Notes, in total: {selectedAccountNotes.length}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAccountNotes.map((n) => (
            <li className="list-group-item" key={n.id}>
              {n.content}
            </li>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* floating window for adding notes*/}
      <Modal show={showAddingNote} onHide={addingNotehandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adding Note to {props.account_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="card"
            onSubmit={subumitNoteHandler}
          >
            <div className="form-group">
              <label htmlFor="noteContent">Content</label>
              <input
                type="text"
                className="form-control"
                id="noteContent"
                placeholder="Enter note content"
                value={content}
                onChange={inputNameHandler}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "50%", margin: "10px auto" }}
            >
              Submit
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={addingNotehandleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* adding account */}
      <Modal show={showAddingAccount} onHide={addingAccounthandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adding Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="card"
            onSubmit={submitAccountHandler}
          >
            <div className="form-group">
              <label htmlFor="account">Account Name</label>
              <input
                type="text"
                className="form-control"
                id="account"
                placeholder="Enter account name"
                value={addAccountName}
                onChange={handleAddingName}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "50%", margin: "10px auto" }}
            >
              Submit
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={addingAccounthandleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* change name */}
      <Modal show={showUpdatingAccount} onHide={updateAccounthandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Account Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="card"
            onSubmit={submitUpdateAccountHandler}
          >
            <div className="form-group">
              <label htmlFor="account">Account Name</label>
              <input
                type="text"
                className="form-control"
                id="account"
                placeholder="Enter account name"
                value={updateAccountName}
                onChange={handleupdatingName}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "50%", margin: "10px auto" }}
            >
              Submit
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={updateAccounthandleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MainPage;
