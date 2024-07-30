import React, { useEffect, useState } from "react";
import { getUserDetails, participents } from "../../api/api";
import { useSelector } from "react-redux";

const initialParticipantsData = [
  {
    id: 1,
    name: "Miracle Rosser",
    img: "images/participant-1.png",
    status: "Payed",
  },
  {
    id: 2,
    name: "Miracle Rosser",
    img: "images/participant-2.png",
    status: "Not Payed",
  },
  {
    id: 3,
    name: "Miracle Rosser",
    img: "images/participant-3.png",
    status: "Payed",
  },
  {
    id: 4,
    name: "Miracle Rosser",
    img: "images/participant-4.png",
    status: "Not Payed",
  },
  {
    id: 5,
    name: "Miracle Rosser",
    img: "images/participant-5.png",
    status: "Payed",
  },
  {
    id: 6,
    name: "Miracle Rosser",
    img: "images/participant-6.png",
    status: "Not Payed",
  },
  {
    id: 7,
    name: "Miracle Rosser",
    img: "images/participant-7.png",
    status: "Payed",
  },
  {
    id: 8,
    name: "Miracle Rosser",
    img: "images/participant-8.png",
    status: "Not Payed",
  },
  {
    id: 9,
    name: "Miracle Rosser",
    img: "images/participant-9.png",
    status: "Payed",
  },
  {
    id: 10,
    name: "Miracle Rosser",
    img: "images/participant-10.png",
    status: "Not Payed",
  },
];

export default function Participants() {
  const [participants, setParticipants] = useState(initialParticipantsData);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [filter, setFilter] = useState("All");
  const authToken = useSelector((state) => state.token);
  const [role, setRole] = useState(false); // Default to false

  useEffect(() => {
    getUserRole();
    getParticipents();
  }, []);

  const getUserRole = async () => {
    try {
      const res = await getUserDetails(authToken);
      setRole(res?.data?.data?.user?.role); // Assume role is a boolean
      console.log(res);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const getParticipents = async () => {
    try {
      const res = await participents(authToken);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };

  const handleDropdownToggle = (id) => {
    setOpenDropdownId((prevOpenDropdownId) =>
      prevOpenDropdownId === id ? null : id
    );
  };

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  const handleAcceptClick = (id) => {
    setParticipants((prevParticipants) =>
      prevParticipants.map((participant) =>
        participant.id === id
          ? { ...participant, status: "Payed" }
          : participant
      )
    );
    setOpenDropdownId(null); // Close the dropdown after updating the status
  };

  const filteredParticipants = participants.filter(
    (participant) => filter === "All" || participant.status === filter
  );

  if (!role) return null; // If role is not true, render nothing

  return (
    <>
      <div className="participants" style={{ paddingTop: "30px" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="participants-area pb-120">
                <h4>Confirmed</h4>
                <div
                  className="filter-options"
                  style={{ marginBottom: "20px" }}
                >
                  <button
                    onClick={() => handleFilterChange("All")}
                    style={{ marginRight: "10px" }}
                  >
                    All
                  </button>
                  <button
                    onClick={() => handleFilterChange("Payed")}
                    style={{ marginRight: "10px" }}
                  >
                    Payed
                  </button>
                  <button onClick={() => handleFilterChange("Not Payed")}>
                    Not Payed
                  </button>
                </div>
                {filteredParticipants.map((participant) => (
                  <div className="participants-single" key={participant.id}>
                    <div className="left-area d-flex align-items-center">
                      <img src={participant.img} alt="participant" />
                      <div className="right-side">
                        <h6>
                          {participant.name}{" "}
                          {participant.status === "Payed" ? (
                            <span style={{ color: "green" }}> (Payed)</span>
                          ) : (
                            <span style={{ color: "red" }}> (Not Payed)</span>
                          )}
                        </h6>
                      </div>
                    </div>
                    {participant.status === "Not Payed" && (
                      <div
                        className="right-area"
                        style={{ position: "relative" }}
                      >
                        <div className="nice-select">
                          <span
                            className="current single-item share"
                            onClick={() => handleDropdownToggle(participant.id)}
                          >
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                          </span>
                          {openDropdownId === participant.id && (
                            <ul
                              className="list"
                              style={{
                                position: "absolute",
                                zIndex: 1,
                                padding: "10px",
                                left: "-100px",
                                top: "-10px",
                                background: "#0D0D59",
                                width: "100px",
                                borderRadius: "6px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "10px",
                              }}
                            >
                              <li>
                                <a
                                  href="#"
                                  onClick={() => handleAcceptClick(participant.id)}
                                >
                                  <i className="fab fa-facebook-f"></i>Accept
                                </a>
                              </li>
                              <li>
                                <a href="profile.html">
                                  <i className="fas fa-share-alt"></i>Revoke
                                </a>
                              </li>
                            </ul>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
