import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function RecoverPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleVerification = async (e) => {
    e.preventDefault();
    try {
      
      navigate('/login');
    } catch (error) {
      console.error("Error during verification:", error);
      alert("An error occurred during verification");
    }
  };

  return (
    <section id="login-reg">
      <div className="overlay pb-120">
        <div className="container">
          <div className="row pt-120 d-flex justify-content-center">
            <div className="col-lg-6">
              <div className="login-reg-main text-center">
                <h4>Reset Password</h4>
                <div className="form-area">
                  <form onSubmit={handleVerification}>
                    <div className="form-group">
                      <label>Enter Email</label>
                      <input
                        placeholder="Enter Email Here"
                        type="text"
                        id="otp"
                        name="otp"
                        // value={otp}
                        // onChange={handleOtpChange}
                      />
                             <label>Enter Email</label>
                       <input
                        placeholder="Enter Password"
                        type="text"
                        id="otp"
                        name="otp"
                        // value={otp}
                        // onChange={handleOtpChange}
                      />
                             <label>Enter Email</label>
                       <input
                        placeholder="Confirm Password"
                        type="text"
                        id="otp"
                        name="otp"
                        // value={otp}
                        // onChange={handleOtpChange}
                      />
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
