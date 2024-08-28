import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearToken } from "../../ReduxStore/action";
import IconButton from "@mui/material/IconButton";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import Notification from "../atoms/notification";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { getUserDetails, logout } from "../../api/api";
import Preloader from "../atoms/Preloader"; // Import Preloader
import Spinner from "../atoms/Spinner";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [username, setUsername] = useState("");
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // State for loader
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([]);
  const authToken = useSelector((state) => state.token);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    if (authToken) {
      getUserDetail();
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [authToken]);

  const handleLogout = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getUserDetail = async () => {
    try {
      const res = await getUserDetails(authToken);
      setUsername(res.data.data.user.name);
    } catch (error) {
      dispatch(clearToken());
      navigate("/");
      console.error("Error fetching user details:", error);
    }
  };

  const confirmLogout = async () => {
    setLoading(true); // Show the loader

    try {
      await logout(authToken);
      dispatch(clearToken());
      navigate("/login", {
        state: {
          notification: { type: "success", message: "Logout Successfully !!!" },
        },
      });
    } catch (error) {
      console.error("Error during logout:", error);
      dispatch(clearToken());
      navigate("/login", {
        state: {
          notification: { type: "success", message: "Logout Successfully !!!" },
        },
      });
    } finally {
      setLoading(false); // Hide the loader
    }
  };

  const toggleNavbar = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    const handleLinkClick = (e) => {
      if (location.pathname === e.currentTarget.getAttribute("href")) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    const links = document.querySelectorAll('a[href^="/"]');
    links.forEach((link) => link.addEventListener("click", handleLinkClick));

    return () => {
      links.forEach((link) =>
        link.removeEventListener("click", handleLinkClick)
      );
    };
  }, [location.pathname]);

  return (
    <>
      {loading && <Spinner />} {/* Show loader if loading is true */}
      <header
        id="header-section"
        className={`header-section ${
          isScrolled ? "animated fadeInDown header-fixed" : ""
        }`}
      >
        <div className="overlay">
          <div className="container">
            <div className="row d-flex header-area">
              <div className="logo-section flex-grow-1 d-flex align-items-center">
                <Link to="/" className="site-logo site-title">
                  <img src="/images/logo.png" alt="site-logo" />
                </Link>
              </div>
              <button
                className="navbar-toggler ml-auto collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded={!isNavbarCollapsed}
                aria-label="Toggle navigation"
                onClick={toggleNavbar}
              >
                <MenuIcon style={{ color: "white" }} />
              </button>
              <nav className="navbar navbar-expand-lg p-0">
                <div
                  className={`navbar-collapse collapse ${
                    !isNavbarCollapsed ? "show" : ""
                  }`}
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav main-menu ml-auto">
                    <li>
                      <Link
                        to="/"
                        className={location.pathname === "/" ? "active" : ""}
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about"
                        className={
                          location.pathname === "/about" ? "active" : ""
                        }
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/tournament"
                        className={
                          location.pathname === "/tournament" ? "active" : ""
                        }
                      >
                        Tournament
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/contact"
                        className={
                          location.pathname === "/contact" ? "active" : ""
                        }
                      >
                        Contact Us
                      </Link>
                    </li>
                    {authToken ? (
                      <>
                        <li>
                          <Link
                            to="/profile"
                            className={
                              location.pathname === "/profile" ? "active" : ""
                            }
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link>
                            <span
                              className="logout-text"
                              onClick={handleLogout}
                            >
                              Logout
                            </span>
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link to="/login" className="login">
                            Login
                          </Link>
                        </li>
                        <li>
                          <Link to="/signup" className="signup">
                            Sign Up
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </nav>
              <div className="right-area header-action d-flex align-items-center">
                {authToken ? (
                  <div className="user-info">
                    <span className="welcome-message">Welcome, {username}</span>
                    <IconButton
                      className="logout-icon"
                      color="inherit"
                      onClick={handleLogout}
                      style={{ color: "white" }}
                    >
                      <ExitToAppIcon className="logout" />
                    </IconButton>
                  </div>
                ) : (
                  <div className="buttons">
                    <Link to="/login" className="login-btn">
                      Login
                    </Link>
                    <Link to="/signup" className="cmn-btn join-btn">
                      Join Now!
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent className="dialog-content">
            <DialogContentText>
              Are you sure you want to logout?
            </DialogContentText>
          </DialogContent>
          <DialogActions className="dialog-actions">
            <Button onClick={handleClose} className="cancel-button">
              Cancel
            </Button>
            <Button onClick={confirmLogout} className="dialog-button" autoFocus>
              Logout
            </Button>
          </DialogActions>
        </Dialog>
      </header>
    </>
  );
}
