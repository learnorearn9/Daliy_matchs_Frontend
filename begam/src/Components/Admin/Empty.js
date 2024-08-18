import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Empty = (props) => {
  const { updateToggle } = props;
  const toggleFunction = () => {
    updateToggle(prev => !prev);  
}


  return (
    <>
    <div className='toggle'>
                    <button onClick={toggleFunction}>
                      <FontAwesomeIcon icon={faBars}/>
                    </button>
                </div> 
    </>
  )
}

export default Empty
