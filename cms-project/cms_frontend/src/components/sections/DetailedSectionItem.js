import React, { useContext, useEffect } from 'react'
import AuthContext from "../../context/auth/authContext"
import ConferenceContext from "../../context/conference/conferenceContext"
import SectionForm from "./SectionForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenAlt } from "@fortawesome/free-solid-svg-icons";

const DetailedSectionItem = () => {

    const authContext = useContext(AuthContext);
    const conferenceContext = useContext(ConferenceContext);

    const { permissions, loadUser} = authContext;
    const { currentSection } = conferenceContext;

    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, []) 

    const findPermission = (tbf) => {
        if (conferenceContext.current) {
            const result = permissions.filter(perm => perm.permission === tbf)
                                    .filter(perm => perm.conferenceId === conferenceContext.current.id);
            return result.length > 0;
        }
        return false;
      }

    const isChair = findPermission('chair');

    return (
        <div className="card bg-light">
            {currentSection && !isChair && ( <>
                <ul className="list">
                    { currentSection.conferenceId && (
                        <li>
                        <FontAwesomeIcon icon={faPenAlt}></FontAwesomeIcon>{" "}
                        The section will be part of the conference with ID: {currentSection.conferenceId}
                        </li>
                    )}
                    { currentSection.chairId && (
                        <li>
                        <FontAwesomeIcon icon={faPenAlt}></FontAwesomeIcon>{" "}
                        And was added by the chair having the ID: {currentSection.chairId}
                        </li>
                    )}
                </ul>
            </>
            )
            }
            { isChair && (
                <SectionForm></SectionForm>
            )}
        </div>
    )
}

export default DetailedSectionItem
