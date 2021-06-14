import React, { Fragment, useContext, useEffect } from 'react'
import ConferenceContext from "../../context/conference/conferenceContext"
import SectionItem from "./SectionItem"

import { CSSTransition, TransitionGroup } from "react-transition-group";

const Sections = () => {

    const conferenceContext = useContext(ConferenceContext);

    const { current, sections } = conferenceContext;
    
    useEffect(() => {
        //console.log("evaluating Sections");
    }, [])

    return (
        <Fragment>
        {sections.length > 0 ? (
        <TransitionGroup>
          {
          sections.map((section) => section.conferenceId === current.id && (
                <CSSTransition
                  key={section.id}
                  timeout={500}
                  classNames="item"
                >
                  <SectionItem key={section.id} section={section} />
                </CSSTransition>)
              )}
        </TransitionGroup>
      ) : (
          <div>
            <p style={{textAlign: "center", marginTop: "1rem"}}>
              There are no sessions added yet! Come back later!
            </p>
          </div>
      )}
    </Fragment>
    )
}

export default Sections
