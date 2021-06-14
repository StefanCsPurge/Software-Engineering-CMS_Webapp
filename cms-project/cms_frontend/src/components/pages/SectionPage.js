import React, { useContext, useEffect } from 'react'
import AuthContext from "../../context/auth/authContext";
import ConferenceContext from "../../context/conference/conferenceContext"
import Sections from "../sections/Sections"
import DetailedSectionItem from "../sections/DetailedSectionItem"

const SectionPage = (props) => {

    const conferenceContext = useContext(ConferenceContext)
    const authContext = useContext(AuthContext);
    const { current } = conferenceContext;

    useEffect(() => {
        authContext.loadUser();
        conferenceContext.clearCurrentSection();
        if(current === null) {
            props.history.push("/");
        }
        // eslint-disable-next-line
      }, [current]);

    return (
        <div className="grid-2">
            <div>
                <DetailedSectionItem/>
            </div>
            <div>
                <Sections/>
            </div>
        </div>
    )
}

export default SectionPage
