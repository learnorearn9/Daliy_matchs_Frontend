import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Preloader from "../atoms/Preloader";
import { login } from "../../api/api";
import Notification from "../atoms/notification";
import { setToken } from "../../ReduxStore/action";
import { useDispatch } from "react-redux";

export default function Login() {
  const userRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

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

    // Validate email and password
    if (!validateEmail(user)) {
      setNotifications([{ type: "error", message: "Enter a valid email" }]);
      return;
    }

    if (!validatePassword(pwd)) {
      setNotifications([{ type: "error", message: "Enter a valid password!" }]);
      return;
    }

    setLoading(true);

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
      setNotifications([{ type: "error", message: "Login failed. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Preloader />}
      <div className="notification-container">
        {notifications.map((notification, index) => (
          <Notification key={index} type={notification.type} message={notification.message} />
        ))}
      </div>
      <section id="login-reg">
        <div className="overlay pb-120">
          <div className="container">
            <div className="top-area">
              <div className="row d-flex align-items-center">
                <div className="col-sm-5 col">
                  <Link className="back-home" to={"/"}>
                    <img src="images/left-icon.png" alt="Back to Home" />
                    Back To Begam
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
                        <input
                          placeholder="Enter your Password"
                          type="password"
                          id="password"
                          value={pwd}
                          onChange={(e) => setPwd(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group recover">
                        <p>
                          Forgot your password? <Link to={"/reset"}>Recover Password</Link>
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
                        Don't have an account? <Link to={"/signup"}>Sign Up Here</Link>
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
