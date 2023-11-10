import React, {useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {userContext} from '../App'


const NavBar = () => {
  const {state,dispatch} = useContext(userContext)
  const navigate = useNavigate()
  const renderList = () => {
    if(state){
        return [
          <li key="profile"><Link to="/profile">Profile</Link></li>,
          <li key="create"><Link to="/create">create post</Link></li>,
          <li key="myfollowing"><Link to="/myfollowingpost">My following Posts</Link></li>,
          <li key="logout">
           <button className="btn #c62828 red darken-3"
           onClick={()=>{
            localStorage.clear()
            dispatch({type:"CLEAR"})
            navigate('/signin')
           }}
          >
            Logout
          </button>
         </li>
        ]
    }else{
      return [
        <li key="signin"><Link to="/signin">Signin</Link></li>,
        <li key="signup"><Link to="/signup">Signup</Link></li>
      ]
    }
  }
    return(
        <nav>
    <div className="nav-wrapper white">
      <Link to={state?"/":"/signin"} className="brand-logo left">TheGram</Link>
      <ul id="nav-mobile" className="right">
        {renderList()}
      </ul>
    </div>
  </nav>
    )
}

export default NavBar