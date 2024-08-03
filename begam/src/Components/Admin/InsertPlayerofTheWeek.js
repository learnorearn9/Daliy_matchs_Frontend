import React, { useState } from 'react';
import { useSelector } from 'react-redux'; // Ensure you have the correct import if using Redux
import { useNavigate, Link } from 'react-router-dom'; // Ensure you have the correct import for navigation
import { insertResult } from '../../api/api';

const InsertPlayerOfTheWeek = () => {
    const token = useSelector((state) => state.token);
    const [playerData, setPlayerData] = useState({
        email: "",
        tournamentId: "",
        date: "",
        prize: ""
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

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
            } else if ((key === "prize") && isNaN(value)) {
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
                const res = await insertResult(playerData, token); // Ensure this API function is defined
                navigate('/profile');
                console.log("Player of the Week inserted successfully:", res);
            } catch (error) {
                console.error("Error inserting player of the week:", error);
            }
        }
    };

    return (
        <>
            <section id="login-reg">
                <div className="overlay pb-120">
                    <div className="container">
                        <div className="top-area">
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5 col">
                                    <Link className="back-home" to={"/profile"}>
                                        <img src="images/left-icon.png" alt="Back to Home" />
                                        Back To Profile
                                    </Link>
                                </div>
                                <div className="col-sm-5 col">
                                    <Link to="#">
                                        <img src="images/logo.png" alt="Logo" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="row pt-120 d-flex justify-content-center">
                            <div className="col-lg-6">
                                <div className="login-reg-main text-center">
                                    <h4>Insert Player of the Week</h4>
                                    <div className="form-area">
                                        <form onSubmit={handleSubmit}>
                                            {[
                                                { label: "Email", name: "email", type: "email" },
                                                { label: "Tournament Id", name: "tournamentId", type: "text" },
                                                { label: "Date", name: "date", type: "date" },
                                                { label: "Prize", name: "prize", type: "text" }
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
                    </div>
                </div>
            </section>
        </>
    );
};

export default InsertPlayerOfTheWeek;
