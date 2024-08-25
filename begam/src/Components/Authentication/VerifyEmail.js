import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verify } from "../../api/api";
import { useSelector } from "react-redux";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email; // Extract email from the previous screen
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false); // State to toggle OTP visibility
  const token = useSelector((state) => state.token);

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    try {
      const response = await verify({ email: email, otp: otp });
      if (token) {
        navigate('/');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error("Error during verification:", error);
      alert("An error occurred during verification");
    }
  };

  return (
    <section id="login-reg" style={{ minHeight: "100vh" }}>
      <div className="overlay pb-120">
        <div className="container">
          <div className="row pt-120 d-flex justify-content-center">
            <div className="col-lg-6">
              <div className="login-reg-main text-center">
                <h4>Verify Email</h4>
                <div className="form-area">
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
                          {showOtp ? <faEyeSlash /> : <faEye />} {/* Toggle icon */}
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
