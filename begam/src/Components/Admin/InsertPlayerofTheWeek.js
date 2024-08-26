import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllTournaments, getallUser, insertPlayerOfTheWeek } from '../../api/api';
import Notification from '../atoms/notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const InsertPlayerOfTheWeek = (props) => {
    const { updateToggle } = props;
    
    const token = useSelector((state) => state.token);
    const [playerData, setPlayerData] = useState({
        userId: "",
        tournamentId: "",
        date: "",
        amount: "",
        rank: "",
        tournamentStateId: "",
    });
    const [users, setUsers] = useState([]);
    const [tournaments, setTournaments] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [notification, setNotification] = useState({ message: "", type: "" }); // Notification state

    useEffect(() => {
        if (notification) {
          const timer = setTimeout(() => {
            setNotification({ type: '', message: '' });
          }, 10000); // Clear notification after 10 seconds
          return () => clearTimeout(timer);
        }
      });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'tournamentId') {
            const selectedTournament = tournaments.find(tournament => tournament._id === value);
            console.log("Selected Tournament:", selectedTournament); // Debug line
            setPlayerData({
                ...playerData,
                [name]: value,
                tournamentStateId: selectedTournament?.tournamentStateIds?.[0] || "", // Extract first tournamentStateId or fallback to ""
            });
        } else {
            setPlayerData({
                ...playerData,
                [name]: value,
            });
        }
    };

    const validate = () => {
        const newErrors = {};
        Object.entries(playerData).forEach(([key, value]) => {
            if (!value) {
                newErrors[key] = "This field is required";
            } else if (key === "amount" && isNaN(value)) {
                newErrors[key] = "This field must be a number";
            } else if (key === "rank" && isNaN(value)) {
                newErrors[key] = "This field must be a number";
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) { // Changed this to properly check validation
            try {
                console.log("Submitting player data:", playerData);
                const res = await insertPlayerOfTheWeek(playerData, token);
                console.log("Player of the Week inserted successfully:", res);
                setNotification({ message: "Player of the Week inserted successfully!", type: "success" }); // Success notification
              
            } catch (error) {
                console.error("Error inserting player of the week:", error);
                if (error.response) {
                    setNotification({
                        message: `Error: ${error.response.data.message || "An error occurred"}`,
                        type: "error"
                    });
                    console.error("Server responded with status code:", error.response.status);
                    console.error("Server response data:", error.response.data);
                } else {
                    setNotification({ message: error.message, type: "error" }); // Error notification
                    console.error("Error message:", error.message);
                }
            }
        }
    };

    const getUsers = async () => {
        try {
            const response = await getallUser(token);
            console.log("API Response:", response);
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
            const response = await getAllTournaments(token);
            console.log("API Response:", response);
            const tournamentsData = response?.data;
            if (Array.isArray(tournamentsData)) {
                setTournaments(tournamentsData); // Ensure tournaments data is an array
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
                    <div className="col-lg-5">
                        <div className="login-reg-main text-center">
                            <h4>Insert Player of the Week</h4>
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
                                                <option key={tournament._id} value={tournament._id}>
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
                                        { label: "Date", name: "date", type: "date" },
                                        { label: "Amount", name: "amount", type: "text" },
                                        { label: "Rank", name: "rank", type: "text" }
                                    ].map(({ label, name, type }) => (
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
                                                type={type}
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

export default InsertPlayerOfTheWeek;
