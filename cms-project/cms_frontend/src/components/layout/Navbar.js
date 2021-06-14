import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import React, { Fragment, useContext } from "react";
import AuthContext from "../../context/auth/authContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRegistered, faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import ConferenceContext from "../../context/conference/conferenceContext";

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const conferenceContext = useContext(ConferenceContext)

  const { isAuthenticated, logout, user } = authContext;
  const { current } = conferenceContext;

  const onLogout = () => {
    logout();
    //clearConferences();
  };

  const authLinks = (
    <Fragment>
      <li>Hello, {user && user.username}! </li>
      <li>
        <a onClick={onLogout} href="#!"> 
          <FontAwesomeIcon icon={faSignOutAlt} style={{color: "yellowgreen"}}></FontAwesomeIcon>
          {" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
      <li>
        <Link to="/">Home</Link>
      </li>
      
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <FontAwesomeIcon icon={faRegistered} style={{color: "yellowgreen"}}></FontAwesomeIcon>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <FontAwesomeIcon icon={faSignInAlt} style={{color: "yellowgreen"}}></FontAwesomeIcon>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className="navbar bg-primary">
      <a href="/">
        <h1>
          <i className={icon} />
          {title}
        </h1>
      </a>
      {isAuthenticated && current && <p style={{marginRight: "auto", marginLeft: "3rem"}}>You are currently inspecting conference: {current.name}</p>}
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: "CMS",
  icon: "fas fa-id-card-alt",
};

export default Navbar;