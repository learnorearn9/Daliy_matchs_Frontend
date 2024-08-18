import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Empty = (props) => {
  const { updateToggle } = props;
  const toggleFunction = () => {
    updateToggle((prev) => !prev);
  };

  return (
    <div>
      <div className="toggle" style={{ margin: "20px" }}>
        <button onClick={toggleFunction}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      <div className="admin-empty">
        <h2>Select From Sidebar to Perform Some action</h2>
      </div>
    </div>
  );
};

export default Empty;
