import React, { useContext, useEffect } from 'react'
import ConferenceContext from "../../context/conference/conferenceContext"


const SectionItem = ({section}) => {

    // const authContext = useContext(AuthContext);
    const conferenceContext = useContext(ConferenceContext);

    const { setCurrentSection } = conferenceContext;
    // const {user, permissions} = authContext;
    
    useEffect(() => {
        
    },[])

    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                {section.name}{" "}
            </h3>

            <p>
                <button
                className="btn btn-success btn-sm btn-press-success"
                onClick={() => setCurrentSection(section)}>
                Find out More
                </button>
            </p>
        </div>
    )
}

export default SectionItem
