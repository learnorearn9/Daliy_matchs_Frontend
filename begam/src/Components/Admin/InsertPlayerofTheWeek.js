import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getallUser, getallTournament, insertResult, getTournaments } from '../../api/api';

const InsertPlayerOfTheWeek = () => {
    const token = useSelector((state) => state.token);
    const [playerData, setPlayerData] = useState({
        userId: "",
        tournamentId: "",
        date: "",
        amount: ""
    });
    const [users, setUsers] = useState([]);
    const [tournaments, setTournaments] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlayerData({
            ...playerData,
            [name]: value,
        });
    };

    const validate = () => {
        const newErrors = {};
        Object.entries(playerData).forEach(([key, value]) => {
            if (!value) {
                newErrors[key] = "This field is required";
            } else if (key === "amount" && isNaN(value)) {
                newErrors[key] = "This field must be a number";
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                console.log("Submitting player data:", playerData);
                const res = await insertResult(playerData, token);
                console.log("Player of the Week inserted successfully:", res);
                navigate('/profile');
            } catch (error) {
                console.error("Error inserting player of the week:", error);
                if (error.response) {
                    console.error("Server responded with status code:", error.response.status);
                    console.error("Server response data:", error.response.data);
                } else {
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
            const response = await getTournaments(token);
            console.log("API Response:", response);
            const tournamentsData = response?.data?.tournamentDetail;
            if (tournamentsData) {
                setTournaments([tournamentsData]);
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

    return (
        <>
            <section id="login-reg">
                <div className="row pt-120 d-flex justify-content-center">
                    <div className="col-lg-6">
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
                                        { label: "Date", name: "date", type: "date" },
                                        { label: "Amount", name: "amount", type: "text" }
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
