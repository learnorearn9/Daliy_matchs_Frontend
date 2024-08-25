import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function RecoverPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    // Email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    // Password validation
    if (!/^\d{1,8}$/.test(password)) {
      newErrors.password = "Password must be a number and between 1 to 8 digits.";
    }
    // Confirm password validation
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      // Perform the password reset logic here
      navigate('/login');
    } catch (error) {
      console.error("Error during verification:", error);
      alert("An error occurred during verification");
    }
  };

  return (
    <section id="login-reg" style={{minHeight:"100vh"}}>
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
                <h4>Reset Password</h4>
                <div className="form-area">
                  <form onSubmit={handleVerification}>
                    <div className="form-group">
                      <label htmlFor="email">Enter Email</label>
                      <input
                        placeholder="Enter Email Here"
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Enter Password</label>
                      <input
                        placeholder="Enter Password"
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <input
                        placeholder="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
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
