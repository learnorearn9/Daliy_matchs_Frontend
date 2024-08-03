import React from "react";

export default function UserDetail(props) {
  const { user } = props;

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
                  <div className="total-area" style={{marginBottom:"30px"}}>
                    <div className="head-area d-flex justify-content-between">
                      <div className="left">
                        <h5>Personal Details</h5>
                      </div>
                    </div>
                    <div className="tab-content" id="myTabContents">
                      <div className="tab-pane fade show active" id="fortnite" role="tabpanel" aria-labelledby="fortnite-tab">
                        <div className="row">
                          <div className="col-lg-12 col-md-12">
                            <div className="profile-input">
                              <label htmlFor="name">Name</label>
                              <input id="name" type="text" value={user.name} readOnly />
                            </div>
                            <div className="profile-input">
                              <label htmlFor="email">Email</label>
                              <input id="email" type="text" value={user.email} readOnly />
                            </div>
                            <div className="profile-input">
                              <label htmlFor="phone">Phone</label>
                              <input id="phone" type="text" value={user.phoneNumber} readOnly />
                            </div>
                          </div>
                        </div>
                      </div>
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
