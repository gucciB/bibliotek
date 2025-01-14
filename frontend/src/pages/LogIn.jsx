// import React from 'react'
import React from "react";
import { useFormik } from "formik"
import InputElement from "./Login/InputElement";
import { Link, useNavigate } from "react-router-dom";

import useApi from "../hooks/useApi";

const LogIn = () => {

  const api = useApi("http://localhost:5000");
  React.useEffect( () => {
    document.title=" Bibliotek : Login"
  }, []);

  const navigateTo = useNavigate();
  const formController = useFormik({
    initialValues:{
      email:"",
      password:""
    },onSubmit: async (values) => {
      await api.post("/user/signup", values);
      navigateTo("/")
    },
  });

  return (
    <main className="m-0 p-0 flex h-screen w-screen bg-loginBack bg-opacity-0">
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
  )
}

export default LogIn