// import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const wavyVariants = {
    animate: {
      x: [0, -10, 10, -10, 10, 0],
      y: [0, -5, 5, -5, 5, 0],
      rotate: [0, -5, 5, -5, 5, 0],
      transition: { duration: 3, ease: "easeInOut" },
    },
  };
  return (
    <main className="flex h-screen">
      <img src="img/page_not_found_img.svg" alt="" 
      className="h-screen w-1/2"/>
      <section className="w-1/2 flex flex-col justify-center items-center font-DMsans select-none text-xl text-loginBack bg-gradient-to-r from-green-100 to-teal-500">
        <motion.h1 
          className='text-8xl font-bold'
          variants={wavyVariants}
          animate='animate'
        >
          404
        </motion.h1>
        <span>The Requested Page Could Not be Found!</span>
        <button onClick={ () => navigate('/', { replace: true }) }
          className='ring-2 ring-loginBack rounded-lg py-2 px-4 my-4 shadow-lg transition-all duration-300 hover:shadow-xl active:scale-95 hover:bg-loginBack hover:text-cyan-400'>Go To Home</button>
      </section>
    </main>
  )
}

export default NotFoundPage