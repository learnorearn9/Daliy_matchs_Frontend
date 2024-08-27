import React, { useEffect, useState } from "react";
import { createUserReview, getUserDetails, getUserReview } from "../../api/api";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Notification from "../atoms/notification"; // Import Notification component
import Spinner from "../atoms/Spinner";

export default function Testimonial() {
  const [review, setReview] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const token = useSelector((state) => state.token);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [user_id, setUser_Id] = useState("");
  const [notifications, setNotifications] = useState([]); // State for notifications
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getReview();
    if (token) {
      getUserDetail();
    }
  }, []);

  const getReview = async () => {
    try {
      const response = await getUserReview();
      const fetchedReviews = response.data;

      // Shuffle and select reviews
      const shuffledReviews = fetchedReviews.sort(() => 0.5 - Math.random());
      const selectedReviews =
        shuffledReviews.length > 3
          ? shuffledReviews.slice(0, 3)
          : shuffledReviews;

      setReview(selectedReviews);
    } catch (error) {
      console.error("Error fetching tournaments:", error);
    }
  };

  const getUserDetail = async () => {
    try {
      const res = await getUserDetails(token);
      setUser_Id(res.data.data.user._id);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const validateReviewForm = () => {
    if (!comment.trim()) {
      setNotifications([{ type: "error", message: "Comment cannot be empty" }]);
      return false;
    }
    if (!rating || rating < 1 || rating > 5) {
      setNotifications([{ type: "error", message: "Rating must be between 1 and 5" }]);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    setNotifications([]); // Clear previous notifications

    if (!validateReviewForm()) return; // Validate form

    setLoading(true);
    try {
      const res = await createUserReview(
        { user_id: user_id, comment: comment, star: rating },
        token
      );
      setNotifications([{ type: "success", message: "Review submitted successfully!" }]);
      // Clear the form after submission
      setComment("");
      setRating("");
      setShowReviewForm(false);
      getReview(); // Refresh the reviews after submission
    } catch (error) {
      console.error("Error submitting review:", error);
      setNotifications([{ type: "error", message: "Failed to submit review. Please try again later." }]);
    }
    finally{
      setLoading(false);
    }
  };


  if(loading){
    return (
      <Spinner/>
    )
  }
  return (
    <>
      {/* Notifications Section */}
      <div className="notification-container">
        {notifications.map((notification, index) => (
          <Notification key={index} type={notification.type} message={notification.message} />
        ))}
      </div>

      {/* Conditionally render the review form */}
      {showReviewForm && (
        <div className="back-shadow">
          <span className="close" onClick={() => setShowReviewForm(false)}>
            &times;
          </span>
          <div className="pop-up">
            <textarea
              type="text"
              placeholder="Enter Your Review"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <input
              type="number"
              placeholder="Enter Your Rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              min="1"
              max="5"
            />
            <button
              className="cmn-btn"
              style={{ color: "white", marginTop: "10px" }}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      )}

      <section id="testimonials-section">
        <div
          className="overlay pt-120 pb-120"
          data-aos="fade-up"
          data-aos-offset="80"
          data-aos-delay="150"
        >
          <div className="container wow fadeInUp">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="section-header text-center">
                  <h2 className="title">Our Gamers Review</h2>
                  <p>Thousands of Happy Gamers All Around the World</p>
                </div>
              </div>
            </div>
            <div className="row mp-none">
              {review.map((testimonial, index) => (
                <div className="col-lg-4 col-md-6 col-sm-6" key={index}>
                  <div className="single-item text-center">
                    <p>{testimonial.comment}</p>
                    <div className="bottom-area d-flex justify-content-between">
                      <div className="left-area d-flex">
                        <div className="img">
                          <div className="img-area">
                            <img src="images/avtar boy.png" alt="testimonial" />
                          </div>
                        </div>
                        <div className="title-area">
                          <h6>{testimonial.user_id.name}</h6>
                        </div>
                      </div>
                      <div className="amount">
                        <h6>{testimonial.star}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "15px",
            }}
          >
            {token ? (
              <button
                className="cmn-btn"
                style={{ color: "white" }}
                onClick={() => setShowReviewForm(true)}
              >
                Create Review
              </button>
            ) : (
              <Link to={"/login"}>
                <button className="cmn-btn" style={{ color: "white" }}>
                  Create Review
                </button>
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
