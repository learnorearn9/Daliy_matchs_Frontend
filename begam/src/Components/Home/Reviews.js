import React, { useEffect, useState } from "react";
import { createUserReview, getUserDetails, getUserReview } from "../../api/api";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Testimonial() {
  const [review, setReview] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false); // State to manage the visibility of the review form
  const token = useSelector((state) => state.token);
  const [comment, setComment] = useState(""); // State to store the textarea value
  const [rating, setRating] = useState(""); // State to store the rating input value
  const [user_id,setUser_Id] = useState("");
  const getReview = async () => {
    try {
      const response = await getUserReview();
      const fetchedReviews = response.data;

      // Shuffle the reviews
      const shuffledReviews = fetchedReviews.sort(() => 0.5 - Math.random());

      // Select only 3 reviews if more than 3 exist, else show all
      const selectedReviews =
        shuffledReviews.length > 3
          ? shuffledReviews.slice(0, 3)
          : shuffledReviews;

      setReview(selectedReviews);
    } catch (error) {
      console.error("Error fetching tournaments:", error);
    }
  };

  useEffect(() => {
    getReview();
    if(token){
      getUserDetail();
    }
  }, []);

  const getUserDetail = async () => {
    try {
      const res = await getUserDetails(token);
       // Log the name field
       setUser_Id(res.data.data.user._id)
       console.log(res.data.data.user._id);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };


  const handleSubmit = async () => {
    console.log("Review Comment:", comment);
    console.log("Rating:", rating);
    console.log("user: ",user_id)

    const res = await createUserReview({user_id:user_id,comment:comment,star:rating},token);
    console.log(res);
    
    // You can add logic here to send the review and rating data to the server
    // Example: submitReview({ comment, rating });

    // Clear the input fields after submission
    setComment("");
    setRating("");
    setShowReviewForm(false); // Optionally hide the form after submission
  };

  return (
    <>
      {/* Conditionally render the review form based on state */}
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
              onChange={(e) => setComment(e.target.value)} // Update comment state
            />
            <input
              type="number"
              placeholder="Enter Your Rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)} // Update rating state
              min="1"
              max="5"
            />
            <button
              className="cmn-btn"
              style={{ color: "white", marginTop: "10px" }}
              onClick={handleSubmit} // Call handleSubmit on click
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
                          {/* <span>{testimonial.location}</span> */}
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
               onClick={() => setShowReviewForm(true)} // Open the review form on click
             >
               Create Review
             </button>
            ):(
             <Link to={'/login'}>
             <button
           className="cmn-btn"
           style={{ color: "white" }}
           onClick={() => setShowReviewForm(true)} // Open the review form on click
         >
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
