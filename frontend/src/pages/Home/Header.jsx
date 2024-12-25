import React from "react";
import { Link } from "react-router-dom";

const Header = () => {

  const [bookName, setBookName] = React.useState('')
  const handleChange = (event) => {
    setBookName(event.target.value);
  }

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
      <div className="w-1/4 flex flex-row ml-auto justify-around">
        <Link to='/login' className="self-center ">
          <div className="mx-4 font-DMsans border-2 h-1/2 w-auto p-2 shadow-md hover:shadow-lg duration-200 text-base tracking-wider active:scale-95 bg-none flex rounded-full hover:scale-105">
            <img src="/account_circle.svg" alt="Unknown Profile" />
            <span className="mx-3">Log In</span>
          </div>
        </Link>
      </div>
    </header>
  )
}

export default Header