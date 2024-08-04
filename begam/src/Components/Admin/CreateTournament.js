import React, { useState } from "react";
import { createTournament } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CreateTournament() {
  const token = useSelector((state) => state.token);
  const [tournamentData, setTournamentData] = useState({
    name: "",
    size: "",
    checkinPeriod: "",
    firstPrize: "",
    secondPrize: "",
    fees: ""
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTournamentData({
      ...tournamentData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    Object.entries(tournamentData).forEach(([key, value]) => {
      if (!value) {
        newErrors[key] = "This field is required";
      } else if (key !== "name" && isNaN(value)) {
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
        const res = await createTournament(tournamentData, token);
        navigate('/profile')
        console.log("Tournament created successfully:", res);
      } catch (error) {
        navigate('/error')
        console.error("Error creating tournament:", error);
      }
    }
  };

  return (
    <section id="login-reg">
          <div className="row pt-120 d-flex justify-content-center">
            <div className="col-lg-6">
              <div className="login-reg-main text-center">
                <h4>Create Tournament</h4>
                <div className="form-area">
                  <form onSubmit={handleSubmit}>
                    {["name", "size", "checkinPeriod", "firstPrize", "secondPrize", "fees"].map((field) => (
                      <div className="form-group" key={field} style={{ padding: "5px" }}>
                        <label htmlFor={field}>Enter {field.split(/(?=[A-Z])/).join(" ")}</label>
                        <input
                          placeholder={`Enter ${field.split(/(?=[A-Z])/).join(" ")}`}
                          type="text"
                          id={field}
                          name={field}
                          value={tournamentData[field]}
                          onChange={handleChange}
                          required
                        />
                        {errors[field] && <div className="error" style={{ color: "red" }}>{errors[field]}</div>}
                      </div>
                    ))}
                    <div className="form-group">
                      <button type="submit" className="cmn-btn">
                        Create
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
    </section>
  );
}
