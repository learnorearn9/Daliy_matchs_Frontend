import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import CreateTournament from "./CreateTournament";
import Empty from "./Empty";
import InsertResult from "./InsertResult";
import InsertPlayerOfTheWeek from "./InsertPlayerofTheWeek";
import Participants from "./Participents";

const Admin = () => {
  const [path, setPath] = useState("empty");
  const [toggle, setToggle] = useState(false);

  const updatePath = (newPath) => {
    setPath(newPath);
  };

  const updateToggle = (newToggle) => {
    setToggle(newToggle);
  };

  useEffect(() => {
    if (!path) {
      setPath("empty");
    }
  }, [path]);

  return (
    <section className="admin-body">
      <Sidebar updatePath={updatePath} toggle={toggle} updateToggle={updateToggle} />
      {path === "empty" && <Empty />}
      {path === "createtournament" && <CreateTournament updateToggle={updateToggle}/>}
      {path === "inserttournament" && <InsertPlayerOfTheWeek updateToggle={updateToggle} />}
      {path === "inserttournamentresult" && <InsertResult updateToggle={updateToggle}/>}
      {path === "allparticipents" && (
        <div>
          <Participants/>
        </div>
      )}
    </section>
  );
};

export default Admin;
