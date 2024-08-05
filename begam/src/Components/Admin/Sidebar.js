import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = (props) => {
  const { updatePath, toggle, updateToggle } = props;

  useEffect(() => {
    console.log(toggle);
  }, [toggle]);

  return (
    <section className={`admin-nav ${toggle ? 'togglle' : ''}`}>
      <div className='back'>
        <button onClick={() => updateToggle(!toggle)}>
          Back
        </button>
      </div>
      <div className='admin-options'>
        <button onClick={() => updatePath("createtournament")}>Create Tournament</button>
        <button onClick={() => updatePath("inserttournament")}>Insert Player of The Week</button>
        <button onClick={() => updatePath("inserttournamentresult")}>Insert Tournament Result</button>
        <button onClick={() => updatePath("allparticipents")}>All Participants</button>
      </div>
    </section>
  );
};

export default Sidebar;
