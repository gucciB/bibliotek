import React from "react";
import PropTypes from "prop-types";

function InputElement({
  handleChange, 
  value,
  id, 
  name, 
  type, 
  autoComplete,
}) {
  const [isFocused, setIsFocused] = React.useState(false);

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
      <input 
        type={type}
        id={id}
        name={name}
        autoComplete={autoComplete}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={handleChange}
        value={value}
        className={`w-full px-2 py-3 indent-2 ring-1 ring-amber-400 outline-none rounded-md`}
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