import React from "react";
import { Link, useNavigate } from "react-router-dom";

import useApi from "../../hooks/useApi";
import UserMenu from "./UserMenu";

const Header = () => {

  const api = useApi("http://localhost:5000");
  const [user, setUser] = React.useState({
    username: "",
    isLoggedIn: false
  });

  const navigateTo = useNavigate();
  function navigateToLogin(){
    if ( !user.isLoggedIn ) {
      navigateTo("/login");
    }else{
      setMenuState( prevState => ({...prevState, isClicked: !prevState.isClicked}) )
    }
  }

  const [menuState, setMenuState] = React.useState({
    isHovered: false,
    isClicked: false
  });const isMenuVisible = user.isLoggedIn && ( menuState.isClicked || menuState.isHovered );
 
  const [bookName, setBookName] = React.useState('')
  const handleChange = (event) => {
    setBookName(event.target.value);
  }

  const initUser = async()  => {
    try {
      const response = await api.get("/");
      const { isLoggedIn } = response.data;
      if( !isLoggedIn ){
        setUser( {username: "", isLoggedIn: false} ); return;
      }setUser( {username: response.data.username, isLoggedIn: true} );
    } catch (error) {
      alert("User Session Initialization Error : " + error.message);
    }
  }

  React.useEffect( () => {
    async function loadSession() {
      await initUser();
    }loadSession();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className="flex flex-row bg-zinc-100 shadow-lg">
        <Link to="/" className="w-1/4" draggable='false'>
          <div className="select-none cursor-pointer p-3 flex-grow" >
            <img className="inline w-2/12 mx-2" src="/favico.png" alt="Bibliotek Logo" draggable='false' />
            <span className="font-gochi title-text-res mx-2 text-gray-600 " >BiblioTek</span>
          </div>
        </Link>
      <div className="w-2/4 flex flex-row items-center self-center">
        <input className="border-2 border-gray-200 shadow-md focus:shadow-xl focus:border-gray-300 duration-200 rounded-lg placeholder:font-gochi placeholder:text-lg indent-3 mx-1 outline-none hover:shadow-xl w-11/12 h-11"
          id="bookname" type="text" placeholder="Search Books..."
          value={bookName} 
          onChange={handleChange} />
        <button className="font-DMsans border-2 h-1/2 w-28 mx-1 p-2 rounded-lg border-gray-200 shadow-md hover:shadow-lg duration-200 text-base tracking-wider active:scale-95 bg-slate-50">Search</button>
      </div>
      <div className="w-1/4 flex flex-row ml-auto justify-around transition-all duration-200">
          <button className="self-center mx-4 font-DMsans border-2 h-1/2 w-auto p-2 shadow-md hover:shadow-lg duration-200 text-base tracking-wider active:scale-95 bg-none flex rounded-full relative"
          onMouseEnter={ () => setMenuState(prevState => ({...prevState, isHovered: true })) }
          onMouseLeave={ () => setMenuState(prevState => ({...prevState, isHovered: false})) }
          onClick={navigateToLogin}>
            <img src="/account_circle.svg" alt="Unknown Profile" />
            <span className="mx-3">{ user.isLoggedIn ? user.username : 'Log In'}</span>
            {user.isLoggedIn && 
            <img src="/arrow_drop_down.svg" alt="Unknown Profile" 
            className={`${isMenuVisible ? "rotate-180" : "hover:rotate-180"} transition-transform duration-200`} />}
            { isMenuVisible && <UserMenu  initUser={initUser} setMenuState={setMenuState} /> }
          </button> 
      </div>
    </header>
  );
}

export default Header