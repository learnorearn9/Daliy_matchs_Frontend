import React, { useEffect, useState } from "react";
import { getUserDetails, participents, revokeUser, updateStatus } from "../../api/api";
import { useSelector } from "react-redux";
import Notification from "../atoms/notification";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


export default function Participants(props) {
  const [participants, setParticipants] = useState([]);
  const [filter, setFilter] = useState("All");
  const token = useSelector((state) => state.token);
  const [role, setRole] = useState(false); // Default to false
  const [notification, setNotification] = useState({ message: "", type: "" });

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
      console.log(res.data);
      
      const mappedParticipants = res?.data.map((participant) => ({
        userId: participant.userId._id,
        id: participant._id,
        name: participant.userId.name,
        img: "images/boy.png", // Replace with actual image path if available
        status: participant.paymentStatus ? "Payed" : "Not Payed",
        tournamentId: participant.tournamentId,
        tournamentStateId: participant.tournamentStateId,
      }));
      //  // Filter participants based on the previous day's date
      //  const filteredParticipants = mappedParticipants.filter(participant => {
      //   const participantDate = new Date(participant.tournamentStateId.date);
      //   const previousDay = new Date();
      //   previousDay.setDate(previousDay.getDate()+1);
      //   previousDay.setHours(0, 0, 0, 0);
        
      //   return participantDate.toDateString() === previousDay.toDateString();
      // });
      
      setParticipants(mappedParticipants || []);
      console.log(filteredParticipants);
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };

  const handleAcceptClick = async (participant) => {

    const data = {
      participantId: participant.id,
      tournamentId: participant.tournamentId,
      tournamentStateId: participant.tournamentStateId._id,
    };
    console.log("Accept clicked with data:", data);
    try {
      // Implement the API call to update participant status if applicable
      // setParticipants((prevParticipants) =>
      //   prevParticipants.map((p) =>
      //     p.id === participant.id ? { ...p, status: "Payed" } : p
      //   )
      // );
      const res = await updateStatus(data, token);
      setNotification({ message: "Participant accepted successfully.", type: "success" });
      window.location.reload();
    } catch (error) {
      setNotification({ message: "Failed to accept participant.", type: "error" });
      console.error("Error accepting participant:", error);
    }
  };
  
  const handleRevokeClick = async (participant) => {
console.log("Revoke>>",participant);

    const data = {
      userId: participant.userId,
      tournamentId: participant.tournamentId,
      tournamentStateId: participant.tournamentStateId._id,
    };
    console.log("Revoke clicked with data:", data);
    try {
      const res = await revokeUser(data, token);
      console.log("Revoke response:", res);
      setNotification({ message: "Participant revoked successfully.", type: "success" });
      window.location.reload();
    } catch (error) {
      setNotification({
        message: `Error: ${error.response?.data?.message || "An error occurred"}`,
        type: "error"
      });
      console.error("Error revoking participant:", error);
    }
  };
  

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  const filteredParticipants = participants.filter(
    (participant) => filter === "All" || participant.status === filter
  );

  if (!role) return null; // If role is not true, render nothing

  const { updateToggle } = props;
  const toggleFunction = () => {
    updateToggle(prev => !prev);  
}

  return (
    <>
     <div className="notification-container">
      <Notification type={notification.type} message={notification.message} />
    </div>

      <div className="users" style={{ padding: "20px" }}>
      <div className='toggle'>
                    <button onClick={toggleFunction}>
                      <FontAwesomeIcon icon={faBars}/>
                    </button>
                </div> 
        <div className="participant" style={{ paddingTop: "30px" }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-11">
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
                  <div >
                  {filteredParticipants.map((participant) => (
                    <div className="participants-single" key={participant.id} style={{display:"flex",gap:"20px"}}>
                      <div className="left-area d-flex align-items-center" style={{minWidth:"55%"}}>
                        <img src={participant.img} alt="participant" />
                        <div className="right-side">
                          <h6>
                            {participant.name}{" "}
                            {/* {participant.status === "Payed" ? (
                              <span style={{ color: "green" }}> (Payed)</span>
                            ) : (
                              <span style={{ color: "red" }}> (Not Payed)</span>
                            )} */}
                           - {
                          
                              participant.tournamentStateId.tournamentId.name
                            }
                          </h6>
                        </div>
                      </div>
                      {participant.status === "Not Payed" && (
                        <div className="right-area" style={{padding:"5px"}}>
                          <button
                            onClick={() => handleAcceptClick(participant)}
                            style={{
                              marginRight: "10px",
                              marginBottom:"10px",
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
                  ))}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
