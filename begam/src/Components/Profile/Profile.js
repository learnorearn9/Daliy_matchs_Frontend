import React, { useEffect, useState } from "react";
import ScrollToTop from "../atoms/scrollTotop";
import Navbar from "../Home/Navbar";
import Preloader from "../atoms/Preloader";
import Details from "./Details";
import Footer from "../Home/Footer";
import UserDetail from "./UserDetail";
import { getUserDetails } from "../../api/api";
import { useSelector } from "react-redux";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const authToken = useSelector((state) => state.token);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const res = await getUserDetails(authToken);
      console.log("API response:", res); // Log the entire response
      if (res?.data?.data?.user) { // Adjusted to match the response structure
        setUser(res.data.data.user);
      } else {
        console.error("User data not found in response:", res);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <>
      <ScrollToTop />
      <Navbar />
      {user && <Details user={user} />}
      {user && <UserDetail user={user} />}
      <Footer />
    </>
  );
}
