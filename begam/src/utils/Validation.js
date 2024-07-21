// src/utils/validation.js

export const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^[0-9]{10}$/;
  const invalidNumbers = ["1234567890", "1111111111", "2222222222"]; // Add more invalid numbers as needed
  return phoneRegex.test(phoneNumber) && !invalidNumbers.includes(phoneNumber);
};

export const validatePassword = (password) => {
  return password.length >= 8 && password.length <= 8;
};

export const validateFields = (details) => {
  const errors = {};
  if (!details.name.trim()) errors.name = "Name is required.";
  if (!details.email.trim()) errors.email = "Email is required.";
  else if (!validateEmail(details.email)) errors.email = "Invalid email format.";
  if (!details.password.trim()) errors.password = "Password is required.";
  else if (!validatePhoneNumber(details.phoneNumber)) errors.phoneNumber = "Invalid phone number.";
  if (!details.dob.trim()) errors.dob = "Date of birth is required.";
  if (!details.address.trim()) errors.address = "Address is required.";
  else if (!validatePassword(details.password)) errors.password = "Password must be exactly 8 characters long.";
  if (!details.phoneNumber.trim()) errors.phoneNumber = "Phone number is required.";
  return errors;
};
