// src/atoms/Notification.js
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Notification = ({ type, message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [message]); // Reset visibility when message changes

  if (!visible) {
    return null; // Hide the component when not visible
  }

  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  );
};

Notification.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default Notification;
