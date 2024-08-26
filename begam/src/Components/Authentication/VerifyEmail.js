import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verify } from "../../api/api";
import { useSelector } from "react-redux";
import Notification from "../atoms/notification"; // Import Notification component
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email; // Extract email from the previous screen
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false); // State to toggle OTP visibility
  const [notifications, setNotifications] = useState([]);
  const token = useSelector((state) => state.token);

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    setNotifications([]); // Clear previous notifications
    try {
      const response = await verify({ email: email, otp: otp });
      if (response.success) {
        setNotifications([{ type: "success", message: "Verification successful!" }]);
        if (token) {
          navigate('/');
        } else {
          navigate('/');
        }
      } else {
        setNotifications([{ type: "error", message: "Verification failed. Please check the OTP." }]);
      }
    } catch (error) {
      console.error("Error during verification:", error);
      setNotifications([{ type: "error", message: "An error occurred during verification" }]);
    }
  };

  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications([]);
      }, 10000); // Clear notifications after 10 seconds
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  return (
    <section id="login-reg" style={{ minHeight: "100vh" }}>
      <div className="overlay pb-120">
        <div className="container">
          <div className="row pt-120 d-flex justify-content-center">
            <div className="col-lg-6">
              <div className="login-reg-main text-center">
                <h4>Verify Email</h4>
                <div className="form-area">
                  <div className="notification-container">
                    {notifications.map((notification, index) => (
                      <Notification
                        key={index}
                        type={notification.type}
                        message={notification.message}
                      />
                    ))}
                  </div>
                  <form onSubmit={handleVerification}>
                    <div className="form-group">
                      <label>Enter OTP Here</label>
                      <div className="otp-container">
                        <input
                          placeholder="Enter OTP"
                          type={showOtp ? "text" : "password"} // Toggle between text and password
                          id="otp"
                          name="otp"
                          value={otp}
                          onChange={handleOtpChange}
                        />
                        <span
                          className="otp-toggle-icon"
                          onClick={() => setShowOtp(!showOtp)}
                        >
                          <FontAwesomeIcon icon={showOtp ? faEyeSlash : faEye} /> {/* Toggle icon */}
                        </span>
                      </div>
                    </div>
                    <div className="form-group">
                      <button type="submit" className="cmn-btn">
                        Verify
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
  );
}
