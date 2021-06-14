import React, { Fragment, useContext, useState } from "react";
import PropTypes from "prop-types";
import ConferenceContext from "../../context/conference/conferenceContext";
import AuthContext from "../../context/auth/authContext"
import PaymentPopUp from "./PaymentPopUp"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLandmark, faHourglassStart, faHourglassEnd } from "@fortawesome/free-solid-svg-icons";


const ConferenceItem = ({ conference, permission }) => {
  const conferenceContext = useContext(ConferenceContext);
  const authContext = useContext(AuthContext);

  const [showPayment, setShowPayment] = useState(false);

  const { id, name, location, type, preliminaryPhaseDeadline, endDate } = conference;

  const { deleteConference, setCurrent, clearCurrent, addListener } = conferenceContext;
  const { user } = authContext;

  const onDelete = () => {
    deleteConference(id);
    clearCurrent();
  };

  // Become listener
  const onEnlist = () => {
    addListener({conferenceId: id, userId: user.id})
    window.location.reload();
  }

  // Initiliaze Payment
  const onInitiliazePayment = () => {
    setShowPayment(true);
  }

  const onClose = () => {
    setShowPayment(false);
  }

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear()
  today = yyyy + '-' + mm + '-' + dd;
  const getCurrentPhase = (date) => {
    if(conference) {
      if(date < conference.preliminaryPhaseDeadline)
        return "preliminaryPhase"
      if(date < conference.firstPhaseDeadline)
        return "firstPhase"
      if(date < conference.bidDeadline)
        return "biddingPhase"
      if(date < conference.secondPhaseDeadline)
        return "reviewPhase"
      if(date < conference.endDate)
        return "thirdPhase"
      return "finished"
    }
  }
  const currentPhase = getCurrentPhase(today);

  const AdminComponents = <Fragment>
      <p>
        <button style={{border: ".5px solid black",borderRadius: '4px'}}
          className="btn btn-dark btn-sm"
          onClick={() => setCurrent(conference)}
        >
          Edit
        </button>
        <button style={{border: ".5px solid black",borderRadius: '4px'}} className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
  </Fragment>
  
  const AuthorListenerPcComponents = <>
  <p>
      <button 
        className="btn btn-sm btn-success btn-press-success"
        onClick={() => setCurrent(conference)}
      >
        View Details 
        </button></p>
  </>

const phaseBadge = <>
<h3 className="text-primary text-left">
    <span
      style={{ float: "right" }}
      className={
        `badge badge-${currentPhase}`
      }
    >
      {currentPhase}
    </span>
  </h3>
</>

  const AuthorBadge = <>
    <h3 className="text-primary text-left">
        <span
          style={{ float: "right" }}
          className={
            "badge badge-danger"
          }
        >
          Author
        </span>
      </h3>
  </>
  
  const ListenerBadge = <>
    <h3 className="text-primary text-left">
        <span
          style={{ float: "right" }}
          className={
            "badge badge-primary"
          }
        >
          Listener
        </span>
      </h3>
  </>
  
  const ChairBadge = <>
    <h3 className="text-primary text-left">
        <span
          style={{ float: "right" }}
          className={
            "badge badge-success"
          }
        >
          Chair
        </span>
      </h3>
  </>
  
  const PcBadge = <>
  <h3 className="text-primary text-left">
        <span
          style={{ float: "right" }}
          className={
            "badge badge-success"
          }
        >
          PcMember
        </span>
      </h3>
  </>
  
  // Author check
  let isAuthor = false;
  if(permission.find(perm => perm.permission === 'author')) {
    isAuthor = true;
  } else {
    isAuthor = false;
  }

  // PC check
  let isPc = false ;
  if(permission.find(perm => perm.permission === 'pc')) {
    isPc = true;
  } else {
    isPc = false;
  }

  // Listener Check
  let isListener = false;
  if(permission.find(perm => perm.permission === 'listener')) {
    isListener = true;
  } else {
    isListener = false;
  }

  // Chair Check
  let isChair = false;
  if(permission.find(perm => perm.permission === 'chair')) {
    isChair = true;
  } else {
    isChair = false;
  }

  return (
    <div className={`card bg-light border-rounded`}>
      
      <h3 className="text-primary text-left">
        {name}{" "}
        <span
          style={{ float: "right" }}
          className={
            "badge " +
            (type === "Academic" ? "badge-success" : "badge-primary")
          }
        >
          {type}
        </span>
      </h3>
      
      <ul className="list">

        <li>
          {phaseBadge}
        </li>

        {location && (
          <li>
            <FontAwesomeIcon icon={faLandmark} style={{color: "yellowgreen"}}></FontAwesomeIcon>{" "}
            {location}
          </li>
        )}
        {preliminaryPhaseDeadline && (
          <li>
            <FontAwesomeIcon icon={faHourglassStart}></FontAwesomeIcon>{" "}
            preliminaryPhaseDeadline: {preliminaryPhaseDeadline}
          </li>
        )}
        {endDate && (
          <li>
            <FontAwesomeIcon icon={faHourglassEnd}></FontAwesomeIcon>{" "}
            endDate: {endDate}
          </li>
        )}
      </ul>

      <div style={{display: "flex"}}>

      {user.isAdmin && AdminComponents}

      {!user.isAdmin && AuthorListenerPcComponents}

      {(!isListener && !user.isAdmin && !isAuthor) && (<p>
        <button className="btn btn-primary btn-sm btn-press" onClick={onInitiliazePayment}>
          Enroll
        </button>
      </p>)}

      {showPayment && (<PaymentPopUp showPayment={showPayment} onEnlist={onEnlist} onClose={onClose}>PaymentPopUp should reside here</PaymentPopUp>)}

      <br/>
      </div>
      <div className="badge__container" style={{display : "flex", position : "relative"}}>
        {isAuthor && AuthorBadge}
        {isPc && PcBadge}
        {isListener && ListenerBadge}
        {isChair && ChairBadge}
      </div>
    </div>
  );
};

ConferenceItem.propTypes = {
  conference: PropTypes.object.isRequired,
};

export default ConferenceItem;