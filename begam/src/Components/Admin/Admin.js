import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import CreateTournament from "./CreateTournament";
import Empty from "./Empty";
import InsertResult from "./InsertResult";
import InsertPlayerOfTheWeek from "./InsertPlayerofTheWeek";

const Admin = () => {
  const [path, setPath] = useState("empty"); // Set default path to "empty"

  const updatePath = (newPath) => {
    setPath(newPath);
  };

  useEffect(() => {
    // Only set default path if it's not already set
    if (!path) {
      setPath("empty");
    }
  }, [path]);

  return (
    <section className="admin-body">
      <Sidebar updatePath={updatePath} />
      {path === "empty" && <Empty />}
      {path === "createtournament" && <CreateTournament />}
      {path === "inserttournament" && <InsertPlayerOfTheWeek />}
      {path === "inserttournamentresult" && <InsertResult />}
      {path === "allparticipents" && (
        <div>
          {/* Content for All Participants */}
        </div>
      )}
    </section>
  );
};

export default Admin;
