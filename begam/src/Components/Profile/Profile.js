import React, { useEffect, useState } from "react";
import ScrollToTop from "../atoms/scrollTotop";
import Navbar from "../Home/Navbar";
import { useDispatch } from "react-redux";
import Preloader from "../atoms/Preloader";
import Details from "./Details";
import Footer from "../Home/Footer";
import UserDetail from "./UserDetail";
import { getUserDetails } from "../../api/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../../ReduxStore/action";
import Spinner from "../atoms/Spinner";

export default function Profile() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const authToken = useSelector((state) => state.token);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const res = await getUserDetails(authToken);
      console.log("API response:", res); // Log the entire response
      if (res?.data?.data?.user) { // Adjusted to match the response structure
        setUser(res.data.data);
      } else {
        console.error("User data not found in response:", res);
      }
    } catch (error) {
      dispatch(clearToken());
      navigate("/");
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <Spinner/>;
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
