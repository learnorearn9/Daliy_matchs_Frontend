import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Preloader from '../atoms/Preloader';
import { login } from '../../api/api';
import Notification from '../atoms/notification';
import { setToken } from '../../ReduxStore/action';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function Login() {
  const location = useLocation();
  const logoutNotification = location.state?.notification;
  const userRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // State to manage the loader
  const [notifications, setNotifications] = useState(
    logoutNotification ? [logoutNotification] : []
  );

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length === 8;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotifications([]); // Clear previous notifications
    setLoading(true); // Show preloader

    // Form validation
    if (!validateEmail(user)) {
      setNotifications([{ type: 'error', message: 'Enter a valid email' }]);
      setLoading(false); // Hide preloader
      return;
    }

    if (!validatePassword(pwd)) {
      setNotifications([{ type: 'error', message: 'Enter a valid password!' }]);
      setLoading(false); // Hide preloader
      return;
    }

    try {
      const response = await login({ email: user, password: pwd });
      const accessToken = response?.data?.token;
      dispatch(setToken(accessToken));
      setUser('');
      setPwd('');
      setSuccess(true);
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
      setNotifications([{ type: 'error', message: 'Login failed. Please try again later.' }]);
    } finally {
      setLoading(false); // Hide preloader after request completes
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications([]);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  return (
    <>
      {loading && <Preloader />} {/* Show preloader while loading is true */}
      {!loading && (
        <>
          <div className="notification-container">
            {Array.isArray(notifications) && notifications.map((notification, index) => (
              <Notification
                key={index}
                type={notification.type}
                message={notification.message}
              />
            ))}
          </div>
          <section id="login-reg" style={{ minHeight: '100vh' }}>
            <div className="overlay pb-120">
              <div className="container">
                <div className="top-area">
                  <div className="row d-flex align-items-center">
                    <div className="col-sm-5 col">
                      <Link className="back-home" to={'/'}>
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
                                type={showPassword ? 'text' : 'password'}
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
                              Forgot your password?{' '}
                              <Link to={'/recover'}>Recover Password</Link>
                              &nbsp;/{' '}
                              <Link to={'/verify-email'}>Verify Email</Link>
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
                            Don't have an account?{' '}
                            <Link to={'/signup'}>Sign Up Here</Link>
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
