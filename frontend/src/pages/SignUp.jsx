import React from "react";

import { useFormik } from "formik"
import InputElement from "./SignUp/InputElement";
import { AnimatePresence, motion  } from "framer-motion";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import useApi from "../hooks/useApi";
import ValidationError from "./SignUp/ValidationError";
import SignUpHeader from "./SignUp/SignUpHeader";
import SignUpStatus from "./SignUp/SignUpStatus";

const SignUp = () => {

  const api = useApi("http://localhost:5000");
  React.useEffect( () => {
    document.title=" Bibliotek : SignUp";
  }, []);
  const navigateTo = useNavigate();
  const [ signUpStatus, setSignUpStatus ] = React.useState({
    dialog: false,
    statusCode: null,
    title: null,
  });
  const hideDialog = () => setSignUpStatus( 
    prevStatus => ({...prevStatus, dialog: false })
  );
  const signUpError = signUpStatus.statusCode !== 201;
  const childMethod = !signUpError ? () => navigateTo("/") : hideDialog;
 
  const formController = useFormik({
    initialValues:{
      username:"",
      email:"",
      password:""
    },onSubmit: async (values) => {
      let response;
      try {
        response = await api.post("/user/signup", values);
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
      
        
    },validate: async (values) => { 
      const errors = {};

      // Username Validation
      if( !values.username ){
        errors.username = "Username is required";
      } else if(values.username.length < 3){
        errors.username = "Username must be at least 3 Characters Long";
      }

      // EMail Validation
      const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!values.email) {
        errors.email = "Email is required";
      } else if( !emailRegex.test(values.email) ){
        errors.email = "Invalid Email Address";
      }

      // Password Validation
      const atLeastOneNumber = /^(?=.*\d)/;
      const atLeastOneSpecialCharacter = /^(?=.*[@$!%*?&])/;
      const atLeastOneUpperCase = /^(?=.*[A-Z])/;
      const atLeastOneLowerCase = /^(?=.*[a-z])/;
      const passwordError = [];
      if( !values.password ) {
        errors.password = "Password is required";
      }else{
        if( !atLeastOneNumber.test( values.password ) ){
          passwordError.push("Password must contain at least one number");
        } if( !atLeastOneSpecialCharacter.test( values.password ) ){
          passwordError.push("Password must contain at least one special character");
        } if ( !atLeastOneUpperCase.test( values.password ) ){
          passwordError.push("Password must contain at least one uppercase letter");
        } if ( !atLeastOneLowerCase.test( values.password ) ){
          passwordError.push("Password must contain at least one lowercase letter");
        }  if ( values.password.length < 8 ){
          passwordError.push( "Password must be at least 8 characters long" );
        }
      }
      if ( passwordError.length > 0 ){
        errors.password = passwordError.join(", ");
      }else{
        delete errors.password;
      }

      return Object.keys(errors).length > 0 ? errors : null;
    },validateOnChange: true,
  });

  const pageVariants = {
    hidden: { opacity: 0, x: 200 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -200, transition: { duration: 0.3 } },
  };

  return (<>
    <AnimatePresence mode="wait">
      { signUpStatus.dialog && <SignUpStatus status={signUpStatus} action={ childMethod }/> }
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
            <section className="flex px-10">
              <img src="/img/login_img_no_bg.png" alt="Open_book" draggable={false} className="w-1/2 m-auto"/>
              <form onSubmit={formController.handleSubmit} className="flex flex-col w-7/12 font-DMsans tracking-wide justify-center items-center">
                <InputElement 
                  handleChange={formController.handleChange} 
                  value={formController.values.username}
                  id={"username"}
                  name={"username"}
                  type={"text"}
                  autoComplete={"off"}
                />
                <AnimatePresence mode="wait">
                  {formController.errors.username && 
                    <ValidationError errors={formController.errors.username} />}</AnimatePresence>

                <InputElement 
                  handleChange={formController.handleChange} 
                  value={formController.values.email}
                  id={"email"}
                  name={"email"}
                  type={"email"}
                  autoComplete={"off"}
                />
                <AnimatePresence mode="wait">
                  {formController.errors.email && 
                    <ValidationError errors={formController.errors.email} />
                  }</AnimatePresence>

                <InputElement 
                  handleChange={formController.handleChange} 
                  value={formController.values.password}
                  id={"password"}
                  name={"password"}
                  type={"password"}
                  autoComplete={"new-password"}
                />
                <AnimatePresence mode="wait">
                  {formController.errors.password && 
                    <ValidationError errors={formController.errors.password} />
                  }</AnimatePresence>
                
                <span className="text-sm text-gray-500">
                  Already have an account? <Link className="text-sm text-amber-600 hover:underline" 
                  onClick={ (event) => {
                    event.preventDefault();
                    navigateTo("/login", { replace: true });
                  }}>Log In</Link>
                </span>
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

export default SignUp;