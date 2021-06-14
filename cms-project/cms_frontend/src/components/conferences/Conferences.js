import React, { Fragment, useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ConferenceContext from "../../context/conference/conferenceContext";
import AuthContext from "../../context/auth/authContext"
import ConferenceItem from "./ConferenceItem";
import PaperContext from "../../context/papers/papersContext"
import Spinner from "../layout/spinner";

const Conferences = () => {
  const conferenceContext = useContext(ConferenceContext);
  const authContext = useContext(AuthContext);
  const paperContext = useContext(PaperContext)

  const { conferences, filtered, getConferences, loading } = conferenceContext;
  const { permissions, getUserPermissions, user } = authContext;
  const { papers } = paperContext;

  const mapPermissions = (id) => {
    const mappedPermissions = permissions.filter((perm) => {
      if(perm.conferenceId === id){
        return perm;
      }
      return undefined;
    })
    return mappedPermissions;
  }
  
  useEffect(() => {
    getConferences();
    getUserPermissions({userId: user.id});
    // eslint-disable-next-line
  }, [user, papers]);

  if (conferences !== null && !loading && conferences.length === 0) {
    return <h4>Please add a conference</h4>;
  }

  return (
    <Fragment>
      {conferences !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((conference) => (
                (<CSSTransition
                  key = {conference.name}
                  timeout={500}
                  classNames="item"
                >
                  <ConferenceItem key={conference.name} conference={conference} permission={mapPermissions(conference.id)}/>
                </CSSTransition>)
              ))
            : conferences.map((conference) => 
              (        
                <CSSTransition        
                  key = {conference.name}
                  timeout={500}
                  classNames="item"
                >
                  <ConferenceItem key={conference.name} conference={conference} permission={mapPermissions(conference.id)}/>
                </CSSTransition>)
              )
          }
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Conferences;