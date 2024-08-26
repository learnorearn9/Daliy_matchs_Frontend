import React, { useEffect, useState } from "react";
import { createTournament } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Notification from "../atoms/notification";

export default function CreateTournament(props) {
  const { updateToggle } = props;
  const token = useSelector((state) => state.token);
  const [tournamentData, setTournamentData] = useState({
    name: "",
    size: "",
    checkinPeriod: "",
    firstPrize: "",
    secondPrize: "",
    fees: "",
    startDateTime: "", // This field will hold the combined date and time
    date: "",
    time: ""
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({ message: "", type: "" }); // Notification state

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ type: '', message: '' });
      }, 10000); // Clear notification after 10 seconds
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTournamentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateTimeChange = (e) => {
    const { name, value } = e.target;
    setTournamentData((prevData) => {
      // Update either date or time, then combine them into startDateTime
      const updatedData = {
        ...prevData,
        [name]: value,
      };

      // Combine date and time into ISO 8601 format if both are set
      if (updatedData.date && updatedData.time) {
        updatedData.startDateTime = new Date(`${updatedData.date}T${updatedData.time}:00.000+00:00`).toISOString();
      }

      return updatedData;
    });
  };

  const validate = () => {
    const newErrors = {};
    Object.entries(tournamentData).forEach(([key, value]) => {
      if (!value && key !== "startDateTime" && key !== "date" && key !== "time") { // Skip validation for combined field and date/time fields
        newErrors[key] = "This field is required";
      } else if (key !== "name" && key !== "startDateTime" && key !== "date" && key !== "time" && isNaN(value)) {
        newErrors[key] = "This field must be a number";
      }
    });
  
    // Validate date and time separately
    if (!tournamentData.date) newErrors.date = "Date is required";
    if (!tournamentData.time) newErrors.time = "Time is required";
  
    // Validate the combined startDateTime
    if (!tournamentData.startDateTime) newErrors.startDateTime = "Date and time are required";
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const res = await createTournament(tournamentData, token);
        setNotification({ message: "Tournament created successfully!", type: "success" }); // Success notification
        setTournamentData({
          name: "",
          size: "",
          checkinPeriod: "",
          firstPrize: "",
          secondPrize: "",
          fees: "",
          startDateTime: "",
          date: "",
          time: ""
        });
      } catch (error) {
        setNotification({ message: error.response?.data?.message || "Error creating tournament", type: "error" }); // Error notification
      }
    } else {
      // Display all validation errors in the notification
      setNotification({ message: Object.values(errors).join(' '), type: "error" });
    }
  };

  const toggleFunction = () => {
    updateToggle(prev => !prev);  
  };

  return (
    <>
      <div className="notification-container">
        {notification.message && (
          <Notification type={notification.type} message={notification.message} />
        )}
      </div>
      <section id="login-reg">
        <div className='toggle'>
          <button onClick={toggleFunction}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
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
                    </div>
                  ))}
                  {/* Date input field */}
                  <div className="form-group" style={{ padding: "5px" }}>
                    <label htmlFor="date">Start Date</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={tournamentData.date || ""}
                      onChange={handleDateTimeChange}
                      required
                    />
                  </div>
                  {/* Time input field */}
                  <div className="form-group" style={{ padding: "5px" }}>
                    <label htmlFor="time">Start Time</label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={tournamentData.time || ""}
                      onChange={handleDateTimeChange}
                      required
                    />
                  </div>
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
    </>
  );
}
