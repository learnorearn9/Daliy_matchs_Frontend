import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = (props) => {
  const { updatePath } = props;

  return (
    <section className='admin-nav'>    
      <div className='back'>
        <button><Link to={'/profile'}>Back</Link></button>
      </div>

      <div className='admin-options'>
        <button onClick={() => updatePath("createtournament")}>Create Tournament</button>
        <button onClick={() => updatePath("inserttournament")}>Insert Player of The Week</button>
        <button onClick={() => updatePath("inserttournamentresult")}>Insert Tournament Result</button>
        <button onClick={() => updatePath("allparticipents")}>All Participants</button>
      </div>
    </section>
  );
}

export default Sidebar;
