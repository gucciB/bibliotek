// import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const ValidationError = ( props ) => {

  const { errors } = props;

  // Extract the errors from the errorObject
  let errorList = errors.split(", ");
  errorList = errorList.map( error => <li key={uuidv4()}>{error}</li>);
  
  console.log("Props", props);
  
  // For animation
  const pageVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1,height: 'auto', transition: { duration: 0.25 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.25 } },
  };

  return (
      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <ul role="alert" className='ring-1 ring-red-400 text-red-500 text-sm p-2 rounded-md w-full opacity-90'>
          {errorList}
        </ul>
      </motion.div>
  )
}

ValidationError.propTypes = {
  propos: PropTypes.any,
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  passwordError: PropTypes.arrayOf(PropTypes.string),
}

export default ValidationError;