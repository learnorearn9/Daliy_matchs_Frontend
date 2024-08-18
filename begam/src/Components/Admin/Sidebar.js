import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft,faClose } from '@fortawesome/free-solid-svg-icons';
const Sidebar = (props) => {
  const { updatePath, toggle, updateToggle } = props;

  useEffect(() => {
    console.log(toggle);
  }, [toggle]);

  return (
    <section className={`admin-nav ${toggle ? 'togglle' : ''}`}>
      <div className='close'  onClick={() => updateToggle(!toggle)}>
        <FontAwesomeIcon icon={faClose}/>
      </div>
      <div className='back'>
        <button>
          <FontAwesomeIcon icon={faArrowLeft}/>
        </button>
        <Link to={'/profile'}>
        <button>
        Back to Profile
        </button></Link>
      </div>
      <div className='admin-options'>
        <button onClick={() => updatePath("createtournament")}>Create Tournament</button>
        <button onClick={() => updatePath("updatetournament")}>All Tournament</button>
        <button onClick={() => updatePath("inserttournament")}>Insert Player of The Week</button>
        <button onClick={() => updatePath("inserttournamentresult")}>Insert Tournament Result</button>
        <button onClick={() => updatePath("allparticipents")}>All Participants</button>
      </div>
    </section>
  );
};

export default Sidebar;
