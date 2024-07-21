import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector to access Redux state
import { clearToken } from "../../ReduxStore/action";
import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch(); // Initialize useDispatch

  const authToken = useSelector((state) => state.token); // Assuming token is stored in Redux state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirmLogout = () => {
    dispatch(clearToken());
    navigate("/login");
    setOpen(false);
  };

  return (
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
                <img src="images/logo.png" alt="site-logo" />
              </Link>
            </div>
            <button
              className="navbar-toggler ml-auto collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fas fa-bars"></i>
            </button>
            <nav className="navbar navbar-expand-lg p-0">
              <div
                className="navbar-collapse collapse"
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
                      to="/tournament"
                      className={
                        location.pathname === "/tournament" ? "active" : ""
                      }
                    >
                      Tournaments
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className={location.pathname === "/about" ? "active" : ""}
                    >
                      About Us
                    </Link>
                  </li>
                  {authToken && (
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
                  )}
                </ul>
              </div>
            </nav>
            <div className="right-area header-action d-flex align-items-center">
              {authToken ? (
                <div className="user-info">
                  <span>Welcome, User</span>
                  <IconButton
                    color="inherit"
                    onClick={handleLogout}
                    style={{ color: "white" }}
                  >
                    <ExitToAppIcon />
                  </IconButton>
                </div>
              ) : (
                <>
                  <Link to="/login" className="login-btn">
                    Login
                  </Link>
                  <Link to="/signup" className="cmn-btn">
                    Join Now!
                  </Link>
                </>
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
  );
}
