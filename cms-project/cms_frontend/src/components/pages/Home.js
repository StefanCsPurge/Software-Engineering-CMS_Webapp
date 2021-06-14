import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import ConferenceContext from "../../context/conference/conferenceContext"
import ConferenceFilter from "../conferences/ConferenceFilter";
import ConferenceForm from "../conferences/ConferenceForm"
import Conferences from "../conferences/Conferences";
import DetailedConferenceItem from "../conferences/DetailedConferenceItem"

const Home = () => {
  const authContext = useContext(AuthContext);
  const conferenceContext = useContext(ConferenceContext);

  const { user } = authContext;
  
  useEffect(() => {
    conferenceContext.getConferences();
    authContext.loadUser();
    authContext.getAllPermissions();
    authContext.getAllUsers();
    // eslint-disable-next-line
  }, []);

  const steeringComponents = (
    <div className="grid-2">
        <div>
          <ConferenceForm/>
        </div>
        <div>
          <ConferenceFilter/>
          <Conferences/>
        </div>
    </div>
  )

  const memberComponents = (
    <div className="grid-2">
        <div>
          <DetailedConferenceItem/>
        </div>
        <div>
          <ConferenceFilter/>
          <Conferences/>
        </div>
    </div>
  )

  return (
    <div>
      {user.isAdmin ? steeringComponents : memberComponents}
    </div>
  );
};

export default Home;
