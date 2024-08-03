import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Verify = () => {
    const authToken = useSelector(state => state.token);
    const navigate = useNavigate();

    return (
    <>
      
    </>
  )
}

export default Verify
