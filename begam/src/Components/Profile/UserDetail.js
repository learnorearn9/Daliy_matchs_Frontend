import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import { updateUserDetails } from "../../api/api";
import { useSelector } from "react-redux";

export default function UserDetail(props) {
  const { user } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [DOB, setDOB] = useState(user?.DOB || '');
  const [address, setAddress] = useState(user?.address || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const token = useSelector((state) => state.token);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      // Collect the user data from state
      const updatedUserData = {
        name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address,
        DOB,
      };

      // Make the API call to update the user details
      const response = await updateUserDetails(updatedUserData, token);

      // Handle the response (you might want to show a success message or update the state)
      console.log('User details updated successfully:', response.data);

      // Disable editing mode after saving
      setIsEditing(false);
    } catch (error) {
      // Handle error (e.g., show error message to the user)
      console.error('Error updating user details:', error);
    }
  };

  // Render nothing if user data is not available
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <section id="all-trophies" className="pb-120">
      <div className="container">
        <div className="tab-content">
          <div className="tab-pane fade show active" role="tabpanel" aria-labelledby="overview-tab">
            <div className="statistics-area">
              <div className="row">
                <div className="col-lg-9">
                  <div className="total-area">
                    <div className="head-area d-flex justify-content-between">
                      <div className="left">
                        <h5>Personal Details</h5>
                      </div>
                      <div className="right">
                        {!isEditing && (
                          <p className="text-sm" onClick={handleEditClick} style={{ cursor: 'pointer' }}>
                            <FontAwesomeIcon icon={faEdit} />
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="tab-content" id="myTabContents">
                      <div className="tab-pane fade show active" id="fortnite" role="tabpanel" aria-labelledby="fortnite-tab">
                        <div className="row">
                          <div className="col-lg-3 col-md-6">
                            <div className="profile-input">
                              <label htmlFor="">Name</label>
                              <input type="text" value={name} onChange={(e) => setName(e.target.value)} readOnly={!isEditing} />
                            </div>
                            <div className="profile-input">
                              <label htmlFor="">DOB</label>
                              <input type="text" value={DOB} onChange={(e) => setDOB(e.target.value)} readOnly={!isEditing} />
                            </div>
                            <div className="profile-input">
                              <label htmlFor="">Address</label>
                              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} readOnly={!isEditing} />
                            </div>
                            <div className="profile-input">
                              <label htmlFor="">Email</label>
                              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} readOnly={!isEditing} />
                            </div>
                            <div className="profile-input">
                              <label htmlFor="">Phone</label>
                              <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} readOnly={!isEditing} />
                            </div>
                            {isEditing && (
                              <div style={{ marginTop: '10px' }}>
                                <button onClick={handleSaveClick} className="btn btn-primary">
                                  <FontAwesomeIcon icon={faSave} /> Save
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Other tabs content */}
                    </div>
                  </div>
                </div>
                {/* Sidebar content */}
                <div className="col-lg-3">
                  <div className="sidebar-area">
                    <div className="title-area">
                      <h5>My Statistics</h5>
                      <p className="text-sm">My Current progress</p>
                    </div>
                    <ul>
                      <li>
                        <span><img src="images/my-statistics-icon-1.png" alt="image"/>Avg. Finish Rank</span>
                        <span>313</span>
                      </li>
                      <li>
                        <span><img src="images/my-statistics-icon-2.png" alt="image"/>Total Games Played</span>
                        <span>1193</span>
                      </li>
                      <li>
                        <span><img src="images/my-statistics-icon-3.png" alt="image"/>Tournaments Played</span>
                        <span>24</span>
                      </li>
                      <li>
                        <span><img src="images/my-statistics-icon-4.png" alt="image"/>Times Paid</span>
                        <span>10</span>
                      </li>
                      <li>
                        <span><img src="images/my-statistics-icon-5.png" alt="image"/>Tournaments Won</span>
                        <span>02</span>
                      </li>
                    </ul>
                  </div>
                  <div className="sidebar-area">
                    <div className="title-area">
                      <h5>Earnings</h5>
                      <p className="text-sm">My current earnings</p>
                    </div>
                    <div className="parents-area">
                      <div className="single-area d-flex align-items-center">
                        <div className="img-area d-flex align-items-center justify-content-center">
                          <img src="images/earnings-icon-1.png" alt="image"/>
                        </div>
                        <div className="right-area">
                          <span><img src="images/coin-icon.png" alt="image"/>300</span>
                          <p className="text-sm">Total Coins Earned</p>
                        </div>
                      </div>
                      <div className="single-area d-flex align-items-center">
                        <div className="img-area mid d-flex align-items-center justify-content-center">
                          <img src="images/earnings-icon-2.png" alt="image"/>
                        </div>
                        <div className="right-area">
                          <span><img src="images/coin-icon.png" alt="image"/>10</span>
                          <p className="text-sm">Average Entry Fee</p>
                        </div>
                      </div>
                      <div className="single-area d-flex align-items-center">
                        <div className="img-area last d-flex align-items-center justify-content-center">
                          <img src="images/earnings-icon-3.png" alt="image"/>
                        </div>
                        <div className="right-area">
                          <span><img src="images/coin-icon.png" alt="image"/>$473.00</span>
                          <p className="text-sm">Total Coins Earned</p>
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
