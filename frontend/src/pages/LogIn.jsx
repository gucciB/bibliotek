import React from "react";
import { useFormik } from "formik";
import InputElement from "./SignUp/InputElement";

import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";


import useApi from "../hooks/useApi";
import SignUpHeader from "./SignUp/SignUpHeader";
import LogInStatus from "./LogIn/LogInStatus";

const LogIn = () => {

  const api = useApi("http://localhost:5000");
  const navigateTo = useNavigate();

  const [ signUpStatus, setSignUpStatus ] = React.useState({
    dialog: false,
    statusCode: null,
    title: null,
  });
  const signUpError = signUpStatus.statusCode !== 200;
  const hideDialog = () => setSignUpStatus( 
    prevStatus => ({...prevStatus, dialog: false })
  );
  const childMethod = !signUpError ? () => navigateTo("/") : hideDialog;

  const formController = useFormik({
    initialValues:{
      email:"",
      password:""
    },onSubmit: async (values) => {
      try {
        const response = await api.post("/user/login", values);
        setSignUpStatus({
          dialog: true,
          statusCode: response.status,
          title: response.data.title
        });
      } catch ( error ) {
        setSignUpStatus({
          dialog: true,
          statusCode: error.status,
          title: error.response.data.errors.title
        });
      }
    },
  });

  const pageVariants = {
    hidden: { opacity: 0, x: -200 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: 200, transition: { duration: 0.3 } },
  };

  return (<>
    <AnimatePresence mode="wait">
      { signUpStatus.dialog && <LogInStatus status={signUpStatus} action={ childMethod }/> }
    </AnimatePresence>
    <SignUpHeader />
    <div className="bg-[url('/img/login_bg/flying_books.jpg')] 
      h-screen w-screen bg-contain
      flex items-center justify-center
    ">
    <motion.main
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <main className={`m-0 p-0 flex h-screen w-screen bg-loginBack bg-opacity-0 transform transition-all duration-500`}>
        <div className=" m-auto w-7/12 shadow-2xl rounded-2xl bg-zinc-100">
          <header className="px-10 py-2 select-none font-gochi"> 
            <span className="title-text-res font-bold tracking-widest">LOGIN & ACCESS</span>
            <span className="tracking-wide"> Millions of Books from all Over the World</span>
          </header>
          <section className="flex">

            <img src="/img/login_img_no_bg.png" alt="Open_book" draggable={false}
              className="w-1/2 m-auto"
            />
            
            <form onSubmit={formController.handleSubmit} autoComplete="off" className="flex flex-col w-7/12 font-DMsans tracking-wide justify-center items-center">

              <InputElement 
                handleChange={formController.handleChange} 
                value={formController.values.email}
                id={"email"}
                name={"email"}
                type={"email"}
                autoComplete={"off"}
              />

              <InputElement 
                handleChange={formController.handleChange} 
                value={formController.values.password}
                id={"password"}
                name={"password"}
                type={"password"}
                autoComplete={"new-password"}
              />

              <span className="text-sm text-gray-500">
                New to Bibliotek? <Link to={"/signup"} className="text-amber-600 hover:underline"> Sign Up</Link> 
              </span>
              <span className="text-sm m-2 hover:underline text-red-500 cursor-pointer">Forgot Password?</span>

              <button className="font-DMsans bg-none text-base tracking-wider 
              mb-5 mt-3 m-auto 
              w-1/3 p-2 
              ring-1 ring-amber-400 outline-none cursor-pointer
              duration-200  
              shadow-md rounded-md 
              hover:scale-105 active:scale-95 hover:shadow-xl" 
              type="submit">
                Submit
              </button>
            </form>
          
          </section>
        </div>
      </main>
    </motion.main>
    </div>
  </>)
}

export default LogIn