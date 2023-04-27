
import './App.css';
import {BrowserRouter as Router ,Route,Routes,Link} from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { AuthContext } from './helpers/AuthContex';
import { useState, useEffect } from 'react';
import PageNotFound from './pages/PageNotFound';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';


function App() {
  const [authState, setAuthState] = useState(false);

  useEffect(()=>{
    if(localStorage.getItem('accessToken')) {
      setAuthState(true);
    }
  },[])

  const logout = () =>{
    localStorage.removeItem("accessToken");
    setAuthState(false);
  }  
  return <div className="App">
    <AuthContext.Provider value={{authState,setAuthState}}>
    <Router>
      <div className='navbar'>
        
        {!authState ? (
          <>
        <Link to="/login">Login</Link>
        <Link to="/registration">Registration</Link>
          </>
        ) : (
          <>
          <Link to="/">Home Page</Link>
          <Link to="/createpost">Create A Post</Link>
          <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
      <Routes>
        <Route path='/' key={Post.Id} element={<Home/>} />
        <Route path='/createpost' key={Post.Id} element={<CreatePost/>} />
        <Route path='/post/:id' key={Post.Id} element={<Post/>} />
        <Route path='/login' key={Post.Id} element={<Login />} />
        <Route path='/registration' key={Post.Id} element={<Registration/>} />
        < Route path='/profile/:id' key={Post.id} element = {<Profile/>} />
        <Route path ='/changepassword' key={Post.Id} element={<ChangePassword/>} />
        <Route path='*' key={Post.Id} element ={<PageNotFound/>} />
      </Routes>
    </Router>
    </AuthContext.Provider>
  </div>;
}   

export default App;
  