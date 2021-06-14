import React, { Fragment, useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PaperContext from "../../context/papers/papersContext";
import ConferenceContext from "../../context/conference/conferenceContext";
import AuthContext from "../../context/auth/authContext";
import ReviewItem from "./ReviewItem";

const Reviews = ({ currentPhase }) => {
  const paperContext = useContext(PaperContext);
  const conferenceContext = useContext(ConferenceContext);
  const authContext = useContext(AuthContext);

  const { papers, getPapers, loading, getAcceptedPapers } = paperContext;
  const { current } = conferenceContext;
  const { user, permissions } = authContext;

  useEffect(() => {
    if (currentPhase !== "reviewPhase") getPapers(current.id);
    else if (currentPhase === "reviewPhase") getAcceptedPapers(user.id);
    // eslint-disable-next-line
  }, []);

  const mapPermissions = (id) => {
    const mappedPermissions = permissions.filter((perm) => {
      if (perm.conferenceId === id) {
        return perm;
      }
      return undefined;
    });
    return mappedPermissions;
  };

  const mappedPermissions = mapPermissions(current.id);

  let isAuthor = false;
  if (mappedPermissions.find((perm) => perm.permission === "author")) {
    isAuthor = true;
  } else {
    isAuthor = false;
  }

  let isPc = false;
  if (mappedPermissions.find((perm) => perm.permission === "pc")) {
    isPc = true;
  } else {
    isPc = false;
  }

  let isChair = false;
  if (mappedPermissions.find((perm) => perm.permission === "chair")) {
    isChair = true;
  } else {
    isChair = false;
  }

  if (papers !== null && !loading && papers.length === 0) {
    return <h4>No papers to review</h4>;
  }

  console.log("reviews: ");
  console.log(papers);
  console.log(currentPhase);
  return (
    <Fragment>
      {papers !== null && !loading && (isPc || isChair) ? (
        <TransitionGroup>
          {currentPhase !== "reviewPhase" &&
            papers.map(
              (paper) =>
                paper.conferenceId === current.id && (
                  <CSSTransition key={paper.id} timeout={500} classNames="item">
                    <ReviewItem key={paper.id} paper={paper} />
                  </CSSTransition>
                )
            )}
          {currentPhase === "reviewPhase" &&
            papers.map(
              (paper) =>
                paper.conferenceId === current.id &&
                paper.evaluatorId === user.id && (
                  <CSSTransition key={paper.id} timeout={500} classNames="item">
                    <ReviewItem key={paper.id} paper={paper} />
                  </CSSTransition>
                )
            )}
        </TransitionGroup>
      ) : null}
      {papers !== null &&
        isAuthor &&
        currentPhase === "firstPhase" &&
        papers.map(
          (paper) =>
            paper.conferenceId === current.id &&
            user.id === paper.authorId && (
              <CSSTransition key={paper.id} timeout={500} classNames="item">
                <ReviewItem key={paper.id} paper={paper} />
              </CSSTransition>
            )
        )}
    </Fragment>
  );
};

export default Reviews;
