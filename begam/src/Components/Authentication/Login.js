import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Preloader from "../atoms/Preloader";
import { login } from "../../api/api";
import Notification from "../atoms/notification";
import { setToken } from "../../ReduxStore/action";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const location = useLocation();
  const logoutNotification = location.state?.notification;
  const userRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // State to manage the loader
  const [notifications, setNotifications] = useState(
    logoutNotification ? [logoutNotification] : []
  );

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length === 8;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotifications([]);

    // Form validation
    if (!validateEmail(user)) {
      setNotifications((prev) => [
        ...prev,
        { type: "error", message: "Enter a valid email" },
      ]);
      return;
    }

    if (!validatePassword(pwd)) {
      setNotifications((prev) => [
        ...prev,
        { type: "error", message: "Enter a valid password!" },
      ]);
      return;
    }

    setLoading(true); // Show loader before making API call

    try {
      const response = await login({ email: user, password: pwd });
      const accessToken = response?.data?.token;
      dispatch(setToken(accessToken));
      setUser("");
      setPwd("");
      setSuccess(true);
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      setNotifications((prev) => [
        ...prev,
        { type: "error", message: "Login failed. Please try again later." },
      ]);
    } finally {
      setLoading(false); // Hide loader when API call is complete
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      {loading && <Preloader />} {/* Show loader while loading is true */}
      {!loading && ( // Render form only if loading is false
        <>
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
                      <h4>Welcome To Begam</h4>
                      <div className="form-area">
                        <form onSubmit={handleSubmit}>
                          <div className="form-group">
                            <label>Email</label>
                            <input
                              placeholder="Enter your Email"
                              type="email"
                              id="email"
                              ref={userRef}
                              name="email"
                              value={user}
                              onChange={(e) => setUser(e.target.value)}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>Password</label>
                            <div className="password-input-wrapper">
                              <input
                                placeholder="Enter your Password"
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={pwd}
                                onChange={(e) => setPwd(e.target.value)}
                                required
                                autoComplete="off"
                              />
                              <span
                                className="password-toggle-icon"
                                onClick={togglePasswordVisibility}
                              >
                                <FontAwesomeIcon
                                  icon={showPassword ? faEyeSlash : faEye}
                                />
                              </span>
                            </div>
                          </div>
                          <div className="form-group recover">
                            <p>
                              Forgot your password?{" "}
                              <Link to={"/recover"}>Recover Password</Link>
                              &nbsp;/{" "}
                              <Link to={"/verify-email"}>Verify Email</Link>
                            </p>
                          </div>
                          <div className="form-group">
                            <button type="submit" className="cmn-btn">
                              Sign In
                            </button>
                          </div>
                        </form>
                        <div className="or">
                          <p>OR</p>
                        </div>
                        <div className="account">
                          <p>
                            Don't have an account?{" "}
                            <Link to={"/signup"}>Sign Up Here</Link>
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
      )}
    </>
  );
}
