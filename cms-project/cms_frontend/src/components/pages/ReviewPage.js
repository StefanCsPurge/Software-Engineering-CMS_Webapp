import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import ConferenceContext from "../../context/conference/conferenceContext"
import Reviews from "../review/Reviews";
import DetailedReviewItem from "../review/DetailedReviewItem"

const ReviewPage = () => {
  const authContext = useContext(AuthContext);
  const conferenceContext = useContext(ConferenceContext);

  const { current } = conferenceContext;

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

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

  const reviewerComponents = (
    <div className="grid-2">
        <div>
          <DetailedReviewItem currentPhase={currentPhase}/>
        </div>
        <div>
          <Reviews currentPhase={currentPhase}/>
        </div>
    </div>
  )

  return (
    <div>
      {reviewerComponents}
    </div>
  );
};

export default ReviewPage;