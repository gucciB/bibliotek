import React from 'react';
import Header from './Home/Header';
import Navbar from './Home/Navbar';

const Home = () => {

  React.useEffect( () => {
    setTimeout( () => {
      document.title = "Bibliotek";
    }, 3000);
  } ,[])

  return (
    <>
      <Header />
      <Navbar />
      <div className='font-DMsans'>Home</div>
    </>
  )
}

export default Home