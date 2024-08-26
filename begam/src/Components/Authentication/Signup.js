import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Preloader from "../atoms/Preloader";
import { signup } from "../../api/api";
import { validateFields } from "../../utils/Validation";
import Notification from "../atoms/notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Signup() {
  const [details, setDetails] = useState({
    email: "",
    name: "",
    password: "",
    phoneNumber: "",
  });
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications([]);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onChange = (e) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePhoneChange = (e) => {
    const phoneNumber = e.target.value;
    if (/^\d*$/.test(phoneNumber) && phoneNumber.length <= 10) {
      setDetails((prevDetails) => ({
        ...prevDetails,
        phoneNumber: phoneNumber,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotifications([]);
    setLoading(true);

    const errors = validateFields(details);
    if (Object.keys(errors).length > 0) {
      const errorNotifications = Object.entries(errors).map(([key, msg]) => ({
        type: "error",
        message: msg,
      }));
      setNotifications(errorNotifications);
      setLoading(false);
      return;
    }

    try {
      await signup({
        name: details.name,
        email: details.email,
        password: details.password,
        phoneNumber: details.phoneNumber,
      });
      setNotifications([{ type: "success", message: "Signup successful!" }]);
      navigate("/verify", { state: { email: details.email } });
    } catch (error) {
      setNotifications([{ type: "error", message: "Unable to Create Account" }]);
      // Clear form fields on error
      setDetails({
        email: "",
        name: "",
        password: "",
        phoneNumber: "",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Preloader />}
      <div className="notification-container">
        {notifications.map((notification, index) => (
          <Notification
            key={index}
            type={notification.type}
            message={notification.message}
          />
        ))}
      </div>
      <section id="login-reg" style={{ minHeight: "100vh" }}>
        <div className="overlay pb-120">
          <div className="container">
            <div className="top-area">
              <div className="row d-flex align-items-center">
                <div className="col-sm-5 col">
                  <Link className="back-home" to="/">
                    <img src="images/left-icon.png" alt="back to home" />
                    Back to Home
                  </Link>
                </div>
                <div className="col-sm-5 col">
                  <Link>
                    <img src="images/logo.png" alt="logo" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="row pt-120 d-flex justify-content-center">
              <div className="col-lg-6">
                <div className="login-reg-main text-center">
                  <h4>Let's get started</h4>
                  <div className="form-area">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label>Full Name</label>
                        <input
                          placeholder="Enter your Full Name"
                          type="text"
                          id="name"
                          name="name"
                          value={details.name}
                          onChange={onChange}
                          autoComplete="new-name"
                        />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          placeholder="Enter your Email"
                          type="email"
                          id="email"
                          name="email"
                          autoComplete="new-email"
                          value={details.email}
                          onChange={onChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input
                          placeholder="Enter your Phone Number"
                          type="text"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={details.phoneNumber}
                          onChange={handlePhoneChange}
                          autoComplete="new-phone"
                        />
                      </div>
                      <div className="form-group">
  <label>Password</label>
  <div className="password-input-wrapper">
    <input
      placeholder="Enter your password"
      type={showPassword ? "text" : "password"}
      id="password"
      name="password"
      value={details.password}
      onChange={onChange}
      autoComplete="new-password"
    />
    <span
      className="password-toggle-icon"
      onClick={togglePasswordVisibility}
    >
      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
    </span>
  </div>
</div>

                      <div className="form-group">
                        <button type="submit" className="cmn-btn">
                          Sign Up Free
                        </button>
                      </div>
                    </form>
                    <div className="account">
                      <p>
                        Already have an account? <Link to="/login">Sign In</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
