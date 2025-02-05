import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex flex-row bg-zinc-100 shadow-lg absolute w-full top-0 z-10">
      <Link to="/" className="w-1/4" draggable='false'>
        <div className="select-none cursor-pointer p-3 flex-grow" >
          <img className="inline w-2/12 mx-2" src="/favico.png" alt="Bibliotek Logo" draggable='false' />
          <span className="font-gochi title-text-res mx-2 text-gray-600 " >BiblioTek</span>
        </div>
      </Link>
    </header>
  );
}

export default Header