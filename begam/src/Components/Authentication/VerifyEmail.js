import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verify } from "../../api/api";
import { useSelector } from "react-redux";

export default function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const [otp, setOtp] = useState("");
  const token = useSelector((state) => state.token);
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    try {
      const response = await verify({email: email,otp:otp});
      if(token){
        navigate('/home')
      }
      else{
        navigate('/')
      }
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
                <h4>Verify Email</h4>
                <div className="form-area">
                  <form onSubmit={handleVerification}>
                    <div className="form-group">
                      <label>Enter OTP Here</label>
                      <input
                        placeholder="Enter OTP"
                        type="text"
                        id="otp"
                        name="otp"
                        value={otp}
                        onChange={handleOtpChange}
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
