import React from "react";
import PropTypes from "prop-types";
// import { v4 as uuidv4 } from 'uuid';

function InputElement({
  handleChange, 
  value,
  id, 
  name, 
  type, 
  autoComplete,
}) {
  const [isFocused, setIsFocused] = React.useState(false);
  const [inputType, setInputType] = React.useState(type);
  return (
    <div className="relative w-7/12 my-3 m-auto">
      <label htmlFor={id} 
      className={`absolute transition-all duration-200 ${
        isFocused || value
          ? "-top-2 left-8 text-xs bg-white px-2 ring-1 ring-amber-400 rounded-md"
          : "top-1/2 left-4 transform -translate-y-1/2 text-sm text-gray-400"
      }`}
      >
        {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
      </label>
      { type==="password" && <label
        className="absolute transition-all duration-200 top-1/2 right-4 transform -translate-y-1/2 text-sm text-gray-400 bg-white px-2 ring-1 ring-amber-400 rounded-md hover:cursor-pointer active:scale-95 select-none"
        onClick={() => {
          setInputType( prevInputType =>{ 
            if(  prevInputType === "password" ){
              return "text";
            }else if( prevInputType === "text" ){
              return "password";
            }
          });
        }}
      >
        {inputType === "password" ? "Show" : "Hide"}
      </label>}
      <input 
        type={inputType}
        id={id}
        name={name}
        autoComplete={autoComplete}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={handleChange}
        value={value}
        className={`w-full px-2 py-3 indent-2 ring-1 ring-amber-400 outline-none rounded-md transition-all duration-200`}
      />
    </div>
  )
}

InputElement.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  id:PropTypes.string.isRequired,
  name:PropTypes.string.isRequired,
  type:PropTypes.string.isRequired,
  autoComplete:PropTypes.string.isRequired,
}
export default InputElement