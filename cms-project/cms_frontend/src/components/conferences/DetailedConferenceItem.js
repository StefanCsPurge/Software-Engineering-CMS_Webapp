import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import ConferenceContext from "../../context/conference/conferenceContext";
import AuthContext from "../../context/auth/authContext"
import SubmitPaperPopup from "../papers/SubmitPapersPopup"
import { Button } from "react-bootstrap";

import {
  faHourglassHalf,
  faHourglassStart,
  faPhone,
  faStopwatch,
  faHourglassEnd,
  faLandmark
 } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DetailedConferenceItem = () => {
  const [isOpen, setIsOpen] = useState(false);

  const history = useHistory()

  const conferenceContext = useContext(ConferenceContext);
  const authContext = useContext(AuthContext);

  
  const { current, getSectionsByConferenceId } = conferenceContext;
  const { permissions } = authContext

  useEffect(() => {
    if(current !== null){
      getSectionsByConferenceId(current.id)
    }
    // eslint-disable-next-line
  }, [current])


  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear()
  today = yyyy + '-' + mm + '-' + dd;
  const getCurrentPhase = (date) => {
    if(current) {
      if(date < current.preliminaryPhaseDeadline)
        return "preliminaryPhase"
      if(date < current.firstPhaseDeadline)
        return "firstPhase"
      if(date < current.bidDeadline)
        return "biddingPhase"
      if(date < current.secondPhaseDeadline)
        return "reviewPhase"
      if(date < current.endDate)
        return "thirdPhase"
      return "finished"
    }
  }
  const currentPhase = getCurrentPhase(today);

  const mapPermissions = () => {

    if(current !== null) {
      const mappedPermissions = permissions.filter((perm) => {
        if(perm.conferenceId === current.id){
          return perm;
        }
        return undefined;
      })
      return mappedPermissions;
    } else {
      return [];
    }
  }

  const goToReview = () => {
    history.push("/review");
  }

  const goToSections = () => {
    history.push("/section");
  }

  const mappedPermissions = mapPermissions();

  // Author check
  let isAuthor = false;
  if(mappedPermissions.find(perm => perm.permission === 'author')) {
    isAuthor = true;
  } else {
    isAuthor = false;
  }

  // PC check
  let isPc = false ;
  if(mappedPermissions.find(perm => perm.permission === 'pc')) {
    isPc = true;
  } else {
    isPc = false;
  }

  // Listener Check
  let isListener = false;
  if(mappedPermissions.find(perm => perm.permission === 'listener')) {
    isListener = true;
  } else {
    isListener = false;
  }

  // Chair Check
  let isChair = false;
  if(mappedPermissions.find(perm => perm.permission === 'chair')) {
    isChair = true;
  } else {
    isChair = false;
  }

  return (
    <div className={`card border-${currentPhase} border-rounded`}>
    {current && (<div>
    <h3 className="text-primary text-left">
        {current.name}{" "}
        <span
          style={{ float: "right" }}
          className={
            "badge " +
            (current.type === "Academic" ? "badge-success" : "badge-primary")
          }
        >
          { current.type.charAt(0).toUpperCase() +  current.type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        
        <li>
          <FontAwesomeIcon icon={faLandmark} style={{color: "yellowgreen"}}></FontAwesomeIcon>{" "}
          The status of the conference is: {currentPhase}
        </li>
        
        {current.location && (
          <li>
            <FontAwesomeIcon icon={faLandmark} style={{color: "yellowgreen"}}></FontAwesomeIcon>{" "}
            The conference will take place in {current.location}
          </li>
        )}
        {current.preliminaryPhaseDeadline && (
          <li>
            <FontAwesomeIcon icon={faHourglassStart}></FontAwesomeIcon>{" "}
            Preliminary Phase Deadline: {current.preliminaryPhaseDeadline}
          </li>
        )}
        {current.firstPhaseDeadline && (
          <li>
            <FontAwesomeIcon icon={faHourglassHalf}></FontAwesomeIcon>{" "}
              First Phase Deadline:  {current.firstPhaseDeadline}
          </li>
        )}
        {current.secondPhaseDeadline && (
          <li>
            <FontAwesomeIcon icon={faStopwatch}></FontAwesomeIcon>{" "}
              Second Phase Deadline: {current.secondPhaseDeadline}
          </li>
        )}
        {current.bidDeadline && (
          <li>
            <FontAwesomeIcon icon={faStopwatch}></FontAwesomeIcon>{" "}
              Bidding Phase Deadline: {current.bidDeadline}
          </li>
        )}
        {current.endDate && (
          <li>
            <FontAwesomeIcon icon={faHourglassEnd}></FontAwesomeIcon>{" "}
              End Date: {current.endDate}
          </li>
        )}
        {current.details && (
          <li>
            <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>{" "}
              details: {current.details}
          </li>
        )}
      </ul>

      {isListener && !isAuthor && currentPhase === "firstPhase" && (<>
        <Button className={"btn-press"} onClick= {() => setIsOpen(true)} >Open Submit Form</Button> <br></br>
      </>)}
      
      </div>)}
      {isOpen && <SubmitPaperPopup open={isOpen} onClose={() => setIsOpen(false)}>Stuff</SubmitPaperPopup>}
      
      {(isChair || isPc) &&(<>
        <Button className={"btn-press"} onClick={goToReview} style={{marginTop:"4px"}}>Go to Reviews </Button><br></br>
      </>)}

      {isAuthor && !(isChair || isPc) &&(<>
        <Button className={"btn-press"} onClick={goToReview} style={{marginTop:"4px"}}>Preview my paper </Button><br></br>
      </>)}
      
      <Button className={"btn-press"} onClick={goToSections} style={{marginTop:"4px"}}>Go to Sections </Button>
      
    </div>
    
  );
};

export default DetailedConferenceItem;