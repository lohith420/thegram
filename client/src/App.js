import React, {createContext,useContext,useEffect,useReducer} from 'react';
import NavBar from './components/Navbar'
import "./App.css"
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/screens/Home'
import Signin from './components/screens/SignIn'
import Signup from './components/screens/Signup'
import Profile from './components/screens/Profile'
import CreatePost from './components/screens/CreatePost'
import {reducer, initialState} from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile'
import SubscribedUserPosts from './components/screens/SubscribedUserPosts'


export const userContext = createContext()



const Routing = () => {
  const navigate = useNavigate()
  const {state,dispatch} = useContext(userContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:"user"})
    }else{
      navigate('/signin');
    }
  },[])
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="signin" element={<Signin />} />
      <Route path="signup" element={<Signup />} />
      <Route exact path="profile" element={<Profile />} />
      <Route path="create" element={<CreatePost />} />
      <Route path="profile:userid" element={<UserProfile />} />
      <Route path="myfollowingpost" element={<SubscribedUserPosts />} />
    </Routes>
  );
};


function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
   return (
    <userContext.Provider value={{state,dispatch}}>
     <BrowserRouter>
       <NavBar />
       <Routing/>
      
     </BrowserRouter>
     </userContext.Provider>
   );
 }

export default App;
