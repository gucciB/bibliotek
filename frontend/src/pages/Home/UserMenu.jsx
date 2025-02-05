import React from "react";

import useApi from "../../hooks/useApi"
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const UserMenu = ( { initUser, setMenuState } ) => {
  
  const navigateTo = useNavigate();
  const api = useApi("http://localhost:5000");

  async function logOut(){
    try {
      const response = await api.get("/user/logout");
      console.log("Response : ", response);
      
      if( response.status === 200 ){
        await initUser();
        navigateTo("/");
      }
    } catch (error) {
      console.log(error.response);
      console.log("Logout Error : " + error.message);
    }
  }

  const menuRef = React.useRef(null);
  React.useEffect( () => {
    function handleClickOutside(event) {
      if ( menuRef.current && !menuRef.current.contains(event.target) ) {
        setMenuState( prevState => ({...prevState, isClicked: false, isHovered:false}) );
      }
    }document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  return (
    <nav className="absolute right-0 -bottom-32 bg-slate-100 w-40 rounded-lg tracking-widest shadow-2xl"
      ref={menuRef}>
      <ul className="list-none flex flex-col">
        <li className="p-2 hover:bg-zinc-200 transition-colors duration-200 rounded-t-lg">Profile</li>
        <li className="p-2 border-zinc-200 border-t-2 border-b-2 transition-colors duration-200 hover:bg-zinc-200">Upload</li>
        <li className="p-2 transition-colors duration-200 hover:bg-zinc-200 rounded-b-lg " onClick={logOut}>Log Out</li>
      </ul>
    </nav>
  )
}

UserMenu.propTypes = {
  initUser: PropTypes.func.isRequired,
  setMenuState: PropTypes.func.isRequired
}

export default UserMenu