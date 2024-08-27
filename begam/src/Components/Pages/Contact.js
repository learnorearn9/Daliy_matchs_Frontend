import React, { useEffect, useState } from 'react';
import Herosection from '../Home/Herosection';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';
import Notification from '../atoms/notification'; // Ensure correct import
import { Link } from 'react-router-dom';
import { contact } from '../../api/api';
import { useSelector } from 'react-redux';

const Contact = () => {
  const token = useSelector((state) => state.token);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
  });

  const [notification, setNotification] = useState({
    type: '',
    message: '',
  });

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = 'Phone number must be 10 digits';

    if (Object.keys(newErrors).length > 0) {
      const errorMessage = Object.values(newErrors).join(' ');
      setNotification({ type: 'error', message: errorMessage });
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await contact({
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
      });
      setNotification({ type: 'success', message: 'Message sent successfully!' });
      setFormData({ name: '', email: '', phoneNumber: '' }); // Clear form
    } catch (error) {
      setNotification({ type: 'error', message: 'Error submitting form. Please try again.' });
    }
  };

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ type: '', message: '' });
      }, 10000); // Clear notification after 10 seconds
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <>
      <Navbar />
      <Herosection />
      <section id="contact-section" className="pt-120 pb-120">
        <div className="overlay">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="section-header text-center">
                  <h5>CONTACT US</h5>
                  <h2 className="title">Get in touch today!</h2>
                  <p>We will call you as soon as we can.</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <form method="post" onSubmit={handleSubmit}>
                  <h5>Leave your message</h5>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter your Name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phoneNumber">Phone</label>
                    <input
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="Enter your Phone Number"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      maxLength="10"
                    />
                  </div>

                  <button className="cmn-btn" type="submit">Submit Now</button>
                </form>
                {notification.message && (
                  <div className="notification-container">
                    <Notification type={notification.type} message={notification.message} />
                  </div>
                )}
              </div>
              <div className="col-md-4">
                <div className="right-sidebar">
                  <h6 className="head-area">More Information</h6>
                  <div className="single-area d-flex align-items-center">
                    <div className="img-area">
                      <img src="images/email-icon.png" alt="email icon" />
                    </div>
                    <div className="right-area">
                      <h6>Email</h6>
                      <p className="text-sm"><Link>play@dailymatch.in</Link></p>
                    </div>
                  </div>
                  <div className="single-area d-flex align-items-center">
                    <div className="img-area">
                      <img src="images/phone-icon.png" alt="phone icon" />
                    </div>
                    <div className="right-area">
                      <h6>Phone</h6>
                      <p className="text-sm">+91 999 865 1111</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
