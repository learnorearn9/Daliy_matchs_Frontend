import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { insertResult } from "../../api/api"; // Make sure this API function is properly defined

const InsertResult = () => {
  const token = useSelector((state) => state.token);
  const [playerData, setPlayerData] = useState({
    email: "",
    tournamentId: "",
    TournamentStateId: "",
    rank: "",
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
      } else if ((key === "rank" || key === "prize") && isNaN(value)) {
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
            <div className="row pt-120 d-flex justify-content-center">
              <div className="col-lg-6">
                <div className="login-reg-main text-center">
                  <h4>Insert Tournament Result</h4>
                  <div className="form-area">
                    <form onSubmit={handleSubmit}>
                      {[
                        { label: "Email", name: "email" },
                        { label: "Tournament Id", name: "tournamentId" },
                        { label: "Tournament State Id", name: "TournamentStateId" },
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
