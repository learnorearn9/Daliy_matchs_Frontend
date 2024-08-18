import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllTournaments, getallUser, getTournaments, insertResult } from "../../api/api";
import Notification from "../atoms/notification";
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const InsertResult = (props) => {
  const { updateToggle } = props;
  const token = useSelector((state) => state.token);
  const [playerData, setPlayerData] = useState({
    userId: "",
    tournamentId: "",
    TournamentStateId: "",
    rank: "",
    prize: ""
  });
  const [users, setUsers] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [notification, setNotification] = useState({ message: "", type: "" }); // Notification state
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayerData((prevData) => {
      let updatedData = { ...prevData, [name]: value };

      // If the tournamentId is changed, update the tournamentStateId
      if (name === "tournamentId") {
        const selectedTournament = tournaments.find(t => t.tournamentId === value);
        if (selectedTournament) {
          updatedData = { ...updatedData, TournamentStateId: selectedTournament.tournamentStateId };
        }
      }

      return updatedData;
    });
  };

  const validate = () => {
    const newErrors = {};
    Object.entries(playerData).forEach(([key, value]) => {
      if (!value) {
        newErrors[key] = "This field is required";
      } else if ((key === "rank" || key === "prize") && isNaN(value)) {
        newErrors[key] = "This field must be a number";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) return;
    try {
      const res = await insertResult(playerData, token);
      console.log("Result inserted successfully:", res);
      setNotification({ message: "Result inserted successfully!", type: "success" }); // Success notification
      setPlayerData({
        userId: "",
        tournamentId: "",
        TournamentStateId: "",
        rank: "",
        prize: ""
      });
    } catch (error) {
      console.error("Error inserting result:", error);
      if (error.response) {
        setNotification({
          message: `Error: ${error.response.data.message || "An error occurred"}`,
          type: "error"
        });
      } else {
        setNotification({ message: error.message, type: "error" }); // Error notification
      }
    }
  };

  const getUsers = async () => {
    try {
      const response = await getallUser(token);
      const usersData = response?.data?.data?.user;
      if (Array.isArray(usersData)) {
        setUsers(usersData);
      } else {
        console.error("Unexpected API response format:", response);
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  };

  const getTournament = async () => {
    try {
      const currentDate = format(new Date(), 'yyyy-MM-dd');

      // Pass the current date as a parameter to getTournaments
      const response = await getAllTournaments(token);
      console.log("API Response:", response);
      const tournamentsData = response?.data;
      if (tournamentsData) {
        setTournaments(tournamentsData);
      } else {
        console.error("Unexpected API response format:", response);
        setTournaments([]);
      }
    } catch (error) {
      console.error("Error fetching tournaments:", error);
      setTournaments([]);
    }
  };

  useEffect(() => {
    getUsers();
    getTournament();
  }, [token]);

  const toggleFunction = () => {
    updateToggle(prev => !prev);  
}


  return (
    <>
     <div className="notification-container">
        <Notification type={notification.type} message={notification.message} /> {/* Show Notification */}
      </div>
      <section id="login-reg">
      <div className='toggle'>
                    <button onClick={toggleFunction}>
                      <FontAwesomeIcon icon={faBars}/>
                    </button>
                </div>
        <div className="row pt-120 d-flex justify-content-center">
          <div className="col-lg-6">
            <div className="login-reg-main text-center">
              <h4>Insert Tournament Result</h4>
              <div className="form-area">
                <form onSubmit={handleSubmit}>
                  <div className="form-group" style={{ padding: "5px" }}>
                    <label htmlFor="userId">User</label>
                    <select
                      id="userId"
                      name="userId"
                      value={playerData.userId}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>Select a user</option>
                      {Array.isArray(users) && users.map(user => (
                        <option key={user._id} value={user._id}>
                          {user.email}
                        </option>
                      ))}
                    </select>
                    {errors.userId && (
                      <div className="error" style={{ color: "red" }}>
                        {errors.userId}
                      </div>
                    )}
                  </div>
                  <div className="form-group" style={{ padding: "5px" }}>
                    <label htmlFor="tournamentId">Tournament</label>
                    <select
                      id="tournamentId"
                      name="tournamentId"
                      value={playerData.tournamentId}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>Select a tournament</option>
                      {Array.isArray(tournaments) && tournaments.map(tournament => (
                        <option key={tournament.tournamentId} value={tournament.tournamentId}>
                          {tournament.name}
                        </option>
                      ))}
                    </select>
                    {errors.tournamentId && (
                      <div className="error" style={{ color: "red" }}>
                        {errors.tournamentId}
                      </div>
                    )}
                  </div>
                  {[
                    { label: "Rank", name: "rank" },
                    { label: "Prize", name: "prize" }
                  ].map(({ label, name }) => (
                    <div
                      className="form-group"
                      key={name}
                      style={{ padding: "5px" }}
                    >
                      <label htmlFor={name}>
                        {label}
                      </label>
                      <input
                        placeholder={`Enter ${label}`}
                        type="text"
                        id={name}
                        name={name}
                        value={playerData[name]}
                        onChange={handleChange}
                        required
                      />
                      {errors[name] && (
                        <div className="error" style={{ color: "red" }}>
                          {errors[name]}
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="form-group">
                    <button type="submit" className="cmn-btn">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InsertResult;
