import React, { useReducer } from "react";
import ConferenceContext from "./conferenceContext";
import conferenceReducer from "./conferenceReducer";
import axios from "axios";
import {
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_FILTER_CONFERENCES,
  ADD_CONFERENCE,
  CONFERENCE_ERROR,
  CLEAR_CONFERENCES,
  UPDATE_CONFERENCE,
  DELETE_CONFERENCE,
  FILTER_CONFERENCES,
  GET_CONFERENCES,
  ADD_AUTHOR,
  ADD_LISTENER,
  ADD_PCMEMBER,
  GET_SECTIONS,
  ADD_SECTION,
  SET_CURRENT_SECTION,
  CLEAR_CURRENT_SECTION
} from "../types";

const ConferenceState = (props) => {
  const initialState = {
    conferences: [
      {
        id: 1,
        name: "Il megliore",
        location: "Madagascar",
        type: "Academic",
        details: "GG",
        preliminaryPhaseDeadline: "2021-05-08 08:43",
        firstPhaseDeadline: "2021-05-26 8:42",
        secondPhaseDeadline: "2021-05-29 8:43",
        endDate: "2021-06-19 08:42"
      },
      {
        id: 2,
        name: "Colantul",
        location: "Congo",
        type: "Hobby",
        details: "GG",
        preliminaryPhaseDeadline: "2021-04-08 09:43",
        firstPhaseDeadline: "2021-06-26 9:42",
        secondPhaseDeadline: "2021-06-29 9:43",
        endDate: "2021-07-19 08:42"
      }],
    current: null,
    filtered: null,
    error: null,
    sections: [],
    currentSection: {},
  };

  const [state, dispatch] = useReducer(conferenceReducer, initialState);

  //  Get Conferences
  const getConferences = async () => {
    const config = {
      headers: {
        "Authorization" : "Bearer " + localStorage.getItem("token"),
      },
    }
    try {
      // uncomment when routes are ready
      const res = await axios.get('http://localhost:8080/api/conferences', config);

      dispatch({ type: GET_CONFERENCES, payload: res.data });
    } catch (err) {
      dispatch({ type: CONFERENCE_ERROR, payload: err });
    }
  };

  // ADD Conference
  const addConference = async (conference) => {
    const config = {
      headers: {
        "Authorization" : "Bearer " + localStorage.getItem("token"),
      },
    }

    try {
      const res = await axios.post("http://localhost:8080/api/conferences", conference, config);

      dispatch({ type: ADD_CONFERENCE, payload: res.data });
    } catch (err) {
      dispatch({ type: CONFERENCE_ERROR, payload: err });
    }
  };

  // DELETE Conference
  const deleteConference = async (id) => {
    const config = {
      headers: {
        "Authorization" : "Bearer " + localStorage.getItem("token"),
      },
    }
    try {
      await axios.delete(`http://localhost:8080/api/conferences/${id}`,config);

      dispatch({ type: DELETE_CONFERENCE, payload: id });
    } catch (err) {
      dispatch({ type: CONFERENCE_ERROR, payload: err.response });
    }
  };

  // UPDATE Conference
  const updateConference = async (conference) => {
    const config = {
      headers: {
        "Authorization" : "Bearer " + localStorage.getItem("token"),
      },
    }

    try {
      const res = await axios.put(
        `http://localhost:8080/api/conferences`,
        conference,
        config
      );

      dispatch({ type: UPDATE_CONFERENCE, payload: res.data });
    } catch (err) {
      dispatch({ type: CONFERENCE_ERROR, payload: err.response });
    }
  };

  // ADD PC Member to conference
  const addPcMember = async (props) => {
    const config = {
      headers: {
        "Authorization" : "Bearer " + localStorage.getItem("token"),
      },
    }
    try {
      const res = await axios.post(
        `http://localhost:8080/api/conferences/addPCMember`,
        props,
        config)
      dispatch({type: ADD_PCMEMBER, payload: res.data})
    } catch (err) {
      dispatch({ type: CONFERENCE_ERROR, payload: err.response });
    }
  }

  // ADD Author to conference
  const addAuthor = async (props) => {
    const config = {
      headers: {
        "Authorization" : "Bearer " + localStorage.getItem("token"),
      },
    }
    try {
      const res = await axios.post(
        `http://localhost:8080/api/conferences/addAuthor`,
        props,
        config)
      dispatch({type: ADD_AUTHOR, payload: res.data})
    } catch (err) {
      dispatch({ type: CONFERENCE_ERROR, payload: err.response });
    }
  }

  // ADD Listener to conference
  const addListener = async (props) => {
    const config = {
      headers: {
        "Authorization" : "Bearer " + localStorage.getItem("token"),
      },
    }
    try {
      const res = await axios.post(
        `http://localhost:8080/api/conferences/addListener`,
        props,
        config)
      dispatch({type: ADD_LISTENER, payload: res.data})
    } catch (err) {
      dispatch({ type: CONFERENCE_ERROR, payload: err });
    }
  }

  const addSection = async (section) => {
    const config = {
      headers: {
        "Authorization" : "Bearer " + localStorage.getItem("token"),
      },
    }
    try {
      const res = await axios.post(
        `http://localhost:8080/api/conferences/addSection`,
        section,
        config)
      dispatch({type: ADD_SECTION, payload: res.data})
    } catch (err) {
      dispatch({ type: CONFERENCE_ERROR, payload: err });
    }
  }

  const getSectionsByConferenceId = async (id) => {
    const config = {
      headers: {
        "Authorization" : "Bearer " + localStorage.getItem("token"),
      },
    }
    try {
      const res = await axios.get(
        `http://localhost:8080/api/conferences/sections/${id}`,
        config)
      dispatch({type: GET_SECTIONS, payload: res.data})
    } catch (err) {
      dispatch({ type: CONFERENCE_ERROR, payload: err });
    }
  }

  // CLEAR Conferences
  const clearConferences = () => {
    dispatch({ type: CLEAR_CONFERENCES });
  };

  // SET current Conference
  const setCurrent = (conference) => {
    dispatch({ type: SET_CURRENT, payload: conference });
  };

  const setCurrentSection = (section) => {
    dispatch({ type: SET_CURRENT_SECTION, payload: section})
  } 

  const clearCurrentSection = (section) => {
    dispatch({ type: CLEAR_CURRENT_SECTION})
  }

  // CLEAR current Conference
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // FILTER conferences
  const filterConferences = (text) => {
    dispatch({ type: FILTER_CONFERENCES, payload: text });
  };

  // CLEAR FILTER
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER_CONFERENCES });
  };

  return (
    <ConferenceContext.Provider
      value={{
        conferences: state.conferences,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        sections: state.sections,
        currentSection: state.currentSection,
        addConference,
        deleteConference,
        setCurrent,
        clearCurrent,
        updateConference,
        filterConferences,
        clearFilter,
        getConferences,
        clearConferences,
        addAuthor,
        addListener,
        addPcMember,
        getSectionsByConferenceId,
        setCurrentSection,
        addSection,
        clearCurrentSection
      }}
    >
      {props.children}
    </ConferenceContext.Provider>
  );
};

export default ConferenceState;
