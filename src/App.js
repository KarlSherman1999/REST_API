import React,{useState, useEffect} from 'react'
import './App.css';
import { signUpFetch, signInFetch, tokenCheck, logOut, deleteFetch, updateFetch } from './utils';

const App = () => {
  const [user,setUser] = useState();
  const [username,setUsername] = useState();
  const [arr,setArr] = useState([]);
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [update,setUpdate] = useState(false);

  const signUpHandler = async (e) => {
    e.preventDefault();
    const returnValue = await signUpFetch(username,email,password);
    setUser(returnValue.user.username)
  }

  const signInHandler = async (e) => {
    e.preventDefault();
    try {
    const returnValue = await signInFetch(username,password);
    setUser(returnValue.username);
    setPassword(returnValue.password);
    window.location.reload(false);
    } catch (error) {
      console.log(error)
      alert("error")
    }
  }

  const updateShow = () => {
    if (update === false){
      setUpdate(true);
    }
    else if (update === true){
      setUpdate(false);
    }
  }

  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      await updateFetch(username,email);
      setUser(username);
      setEmail(email)
      alert(`Successfully updated Username to ${username}`)
      window.location.reload(false);
    } catch (error) {
      console.log(error);
      alert("error")
    }
  }

  const deleteHandler = async () => {
    await deleteFetch(user,setUser);
    localStorage.clear()
  }

  const logOutHandler = async () => {
    await logOut();
    window.location.reload(false);
  }

  const fetchReq = async () => {
    const response = await fetch("https://api.unsplash.com/photos/?client_id=wrBoF6tV3izWF3I8QQINJBi8yOhIBkyC9wQ-66dE6m4");
    const data = await response.json();
    setArr(data);
  }

  useEffect(() => {
    tokenCheck(localStorage.getItem("MyToken"), setUser);
    fetchReq();
  }, []);

  return (
    <div className="App">
      {!user ? (
        <div>
          <h1>Sign Up</h1>
        <form onSubmit={signUpHandler}>
          <input onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
          <input onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
          <input onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
          <button type="submit">Sign Up</button>
        </form>
        <div>
        <h1>Existing User? Log in here.</h1>
        <form onSubmit={signInHandler}>
          <input onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
          <input onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
          <button type="submit">Sign In</button>
        </form>
        </div>
        </div>
      ) : (
        <div>
            <div className='App'>
            <div>
              <button onClick={updateShow}>Change Username</button>
              {update ? (
                <div>
                <form onSubmit={updateHandler}>
                  <input onChange={(e) => setUsername(e.target.value)} placeholder="Set Username"/>
                  <input onChange={(e) => setEmail(e.target.value)} placeholder=" Confirm Email"/>
                  <button type="submit">Confirm</button>
                </form>
                </div>
              ):(<div></div>)}
              <button onClick={deleteHandler}>Delete Account</button>
            </div>
              <button onClick={logOutHandler}>Log out</button>
            </div>
          <div>
          <br/>
          <h1>Welcome, {user}</h1>
          </div>
          {arr.map((item,index)=>{
            return(
              <div>
                <p key={index}>{item.user.name}</p>
                <p>Username: {item.user.username}<br/> Likes: {item.likes}</p>
                <img className='image' src={item.urls.regular} alt="random"/>
              </div>
            )
          })}
        </div>
      )}
    </div>
  );  
}

export default App;
