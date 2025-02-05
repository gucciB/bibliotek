import PropTypes from "prop-types";
import { motion } from "framer-motion";

const LogInStatus = ( {status , action} ) => {

  const { title, statusCode } = status;
  const error = statusCode !== 200;
  const color = !error ? "green-400" : "red-400";

  const pageVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } },
  };
  
  return (
    <main className="absolute z-20 flex flex-col justify-center items-center w-full h-full bg-loginBack bg-opacity-60"> 
      <motion.section
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={`rounded-lg w-1/4 h-1/4 flex items-center justify-center flex-col font-DMsans border-2 border-${color} bg-loginBack shadow-2xl `}
      >
        <h2 className={`font-bold text-2xl text-${color}`}> 
          { !error ? "Success" : "Error Occured" } 
        </h2>
        { error && <p className={`text-lg text-${color}`}> CODE : { statusCode } </p> }
        <p> { title } </p>
        <button 
          className={` border-2 border-${color} rounded-md my-4 py-1 px-2
            font-DMsans bg-none text-base tracking-wider  
            outline-none cursor-pointer
            duration-150 hover:text-loginBack hover:bg-${color}
            hover:scale-105 hover:shadow-xl active:scale-95
          `}
          onClick={ action }
        > 
          { error ? "Close" : "Go To Homepage" } 
        </button>
      </motion.section>
    </main>
  )
}

LogInStatus.propTypes = {
  status: PropTypes.any.isRequired,
  action: PropTypes.func.isRequired
}

export default LogInStatus;