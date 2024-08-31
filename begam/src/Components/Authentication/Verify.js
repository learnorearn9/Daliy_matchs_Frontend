import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { changeemail, verifyEmail } from "../../api/api";
import { useSelector } from "react-redux";
import Notification from "../atoms/notification"; // Import Notification component
import Spinner from "../atoms/Spinner";

export default function Verify() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [notifications, setNotifications] = useState([]);
  const token = useSelector((state) => state.token);
  const [loading,setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    // Email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Verification started");
    if (validateForm()) {
      console.log("Form is valid");
      setNotifications([]); // Clear previous notifications
      try {
        const res = await changeemail(email);
          setNotifications([{ type: "success", message: "OTP sent successfully!" }]);
      } catch (error) {
        console.error("Error during verification:", error);
        setNotifications([{ type: "error", message: "An error occurred during verification" }]);
      }
      finally{
        setEmail("");
        setLoading(false);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } else {
      console.log("Form is invalid");
    }
  };
  

  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications([]);
      }, 1000); // Clear notifications after 10 seconds
      return () => clearTimeout(timer);
    }
  }, [notifications]);


  if(loading){
    return (
      <>
      <Spinner/>
      </>
    )
  }
  return (
    <section id="login-reg" style={{ minHeight: "100vh" }}>
      <div className="overlay pb-120">
        <div className="container">
          <div className="top-area">
            <div className="row d-flex align-items-center">
              <div className="col-sm-5 col">
                <Link className="back-home" to={"/"}>
                  <img src="images/left-icon.png" alt="Back to Home" />
                  Back To Home
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
                      <label htmlFor="email">Enter Email</label>
                      <input
                        placeholder="Verify Email Here"
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <button type="submit" className="cmn-btn">
                        Send OTP
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
