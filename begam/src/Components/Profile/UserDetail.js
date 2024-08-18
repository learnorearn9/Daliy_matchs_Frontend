import React, { useState } from "react";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAward,
  faCheck,
  faCoins,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { updateUserEmail } from "../../api/api";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

export default function UserDetail(props) {
  const { user } = props;
  const token = useSelector((state) => state.token);
  const updatedAt = dayjs(user.user.updatedAt);
console.log(user.user.updatedAt);

  const daysAgo = dayjs().diff(updatedAt, "day");
const navigate = useNavigate();
  // State variables to manage editable state and form data
  const [isEditable, setIsEditable] = useState(false);
  const [formData, setFormData] = useState({
    name: user.user.name,
    email: user.user.email,
    phoneNumber: user.user.phoneNumber,
  });

  // Function to handle edit button click
  const handleEditClick = () => {
    setIsEditable(!isEditable);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    // Log the updated form data
    console.log("Updated User Details:", formData);
    // You can make an API call here to update the user details on the server
    const res = await updateUserEmail(formData,token);
    console.log(res);
    navigate("/verify", { state: { email: formData.email } });
    // Disable editing after submitting
    setIsEditable(false);
  };

  // Render nothing if user data is not available
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <section id="all-trophies" className="pb-120">
      <div className="container">
        <div className="tab-content">
          <div
            className="tab-pane fade show active"
            role="tabpanel"
            aria-labelledby="overview-tab"
            style={{ display: "flex", alignItems: "space-between" }}
          >
            <div className="statistics-area">
              <div className="row">
                <div className="col-lg-9">
                  <div className="total-area" style={{ marginBottom: "30px" }}>
                    <div className="head-area d-flex justify-content-between">
                      <div className="left">
                        <h5>Personal Details</h5>
                      </div>
                      <div class="right">
                        <p class="text-sm">
                          Last Update: <span>{daysAgo} days ago</span>
                        </p>
                      </div>
                      <div className="right" style={{ color: "white" }}>
                        <FontAwesomeIcon
                          icon={isEditable ? faCheck : faEdit}
                          onClick={isEditable ? handleSubmit : handleEditClick}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    </div>
                    <div className="tab-content" id="myTabContents">
                      <div
                        className="tab-pane fade show active"
                        id="fortnite"
                        role="tabpanel"
                        aria-labelledby="fortnite-tab"
                      >
                        <div className="row">
                          <div className="col-lg-12 col-md-12">
                            <div className="profile-input">
                              <label htmlFor="name">Name</label>
                              <input
                                id="name"
                                type="text"
                                value={formData.name}
                                onChange={handleInputChange}
                                readOnly={!isEditable}
                              />
                            </div>
                            <div className="profile-input">
                              <label htmlFor="email">Email</label>
                              <input
                                id="email"
                                type="text"
                                value={formData.email}
                                onChange={handleInputChange}
                                readOnly={!isEditable}
                              />
                            </div>
                            <div className="profile-input">
                              <label htmlFor="phone">Phone</label>
                              <input
                                id="phoneNumber"
                                type="text"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                readOnly={!isEditable}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="statistics-area">
              <div class="row">
                <div class="col-lg-9">
                  <div class="total-area">
                    <div class="head-area d-flex justify-content-between">
                      <div class="left">
                        <h5>Game Statistics</h5>
                        <p class="text-sm">Player's game specific statistics</p>
                      </div>
                    </div>
                    <div class="tab-content" id="myTabContents">
                      <div
                        class="tab-pane fade show active"
                        id="fortnite"
                        role="tabpanel"
                        aria-labelledby="fortnite-tab"
                      >
                        <div class="row">
                          <div class="col-lg-4 col-md-6">
                            <div class="single-item text-center">
                              <img
                                src="images/statistics-icon-1.png"
                                alt="image"
                              />
                              <p>Tournaments Played</p>
                              <h4>
                                {user.TournamentDetails[0].tournamentsParticipated}
                              </h4>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-6">
                            <div class="single-item text-center">
                              <FontAwesomeIcon
                                icon={faCoins}
                                style={{ fontSize: "45px", color: "white" }}
                              />
                              <p>
                                Times
                                <br /> Paid
                              </p>
                              <h4>{user.TournamentDetails[0].totalPrizeMoney}</h4>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-6">
                            <div class="single-item text-center">
                              <FontAwesomeIcon
                                icon={faAward}
                                style={{ fontSize: "45px", color: "white" }}
                              />
                              <p>
                                Tournaments
                                <br /> Won
                              </p>
                              <h4>{user.TournamentDetails[0].firstPlaceCount}</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
