import React from 'react';
import Header from './Home/Header';
import Books from './Books';

const Home = () => {

  React.useEffect( () => {
    setTimeout( () => {
      document.title = "Bibliotek";
    }, 3000);
  } ,[]);

  return (
    <>
      <Header />
      <Books />
      <div className='font-DMsans'>Home</div>
    </>
  )
}

export default Home