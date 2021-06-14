import React, { useContext, useEffect, useRef } from "react";
import ConferenceContext from "../../context/conference/conferenceContext";

const ConferenceFilter = () => {
  const conferenceContext = useContext(ConferenceContext);

  const { filterConferences, clearFilter, filtered } = conferenceContext;

  const text = useRef("");

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
    // eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    if (text.current.value !== "") {
      filterConferences(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        type="text"
        ref={text}
        placeholder="Filter Conferences..."
        onChange={onChange}
      />
    </form>
  );
};

export default ConferenceFilter;