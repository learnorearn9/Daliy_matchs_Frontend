import React, { useEffect, useState } from "react";
import { getUserDetails, participents, revokeUser } from "../../api/api";
import { useSelector } from "react-redux";

export default function Participants() {
  const [participants, setParticipants] = useState([]);
  const [filter, setFilter] = useState("All");
  const token = useSelector((state) => state.token);
  const [role, setRole] = useState(false); // Default to false

  useEffect(() => {
    getUserRole();
    getParticipents();
  }, []);

  const getUserRole = async () => {
    try {
      const res = await getUserDetails(token);
      setRole(res?.data?.data?.user?.role); // Assume role is a boolean
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const getParticipents = async () => {
    try {
      const res = await participents(token);
      const mappedParticipants = res?.data.map((participant) => ({
        id: participant._id,
        name: participant.userId.name,
        img: "images/participant-1.png", // Replace with actual image path if available
        status: participant.paymentStatus ? "Payed" : "Not Payed",
        tournamentId: participant.tournamentId,
        tournamentStateId: participant.tournamentStateId,
      }));
      setParticipants(mappedParticipants || []);
      console.log(mappedParticipants);
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };

  const handleAcceptClick = (participant) => {
    const data = {
      participantId: participant.id,
      tournamentId: participant.tournamentId,
      tournamentStateId: participant.tournamentStateId._id,
    };
    console.log("Accept clicked with data:", data);
    // // Update the status to "Payed" after clicking accept
    // setParticipants((prevParticipants) =>
    //   prevParticipants.map((p) =>
    //     p.id === participant.id ? { ...p, status: "Payed" } : p
    //   )
    // );
  };

  const handleRevokeClick = async (participant) => {
    const data = {
      participantId: participant.id,
      tournamentId: participant.tournamentId,
      tournamentStateId: participant.tournamentStateId._id,
    };
    console.log("Revoke clicked with data:", data);
    const res = await revokeUser(data,token);
    console.log(res);
    
    // Add any additional logic for revoking here
  };

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  const filteredParticipants = participants.filter(
    (participant) => filter === "All" || participant.status === filter
  );

  if (!role) return null; // If role is not true, render nothing

  return (
    <>
      <div className="users" style={{ padding: "20px" }}>
        <div className="participant" style={{ paddingTop: "30px" }}>
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
                        <div className="right-area">
                          <button
                            onClick={() => handleAcceptClick(participant)}
                            style={{
                              marginRight: "10px",
                              backgroundColor: "#0D0D59",
                              color: "white",
                              borderRadius: "5px",
                              padding: "5px 10px",
                            }}
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleRevokeClick(participant)}
                            style={{
                              backgroundColor: "red",
                              color: "white",
                              borderRadius: "5px",
                              padding: "5px 10px",
                            }}
                          >
                            Revoke
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
