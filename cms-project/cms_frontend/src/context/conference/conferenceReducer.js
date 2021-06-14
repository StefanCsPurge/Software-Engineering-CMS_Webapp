import {
    ADD_CONFERENCE,
    DELETE_CONFERENCE,
    UPDATE_CONFERENCE,
    SET_CURRENT,
    CLEAR_CURRENT,
    FILTER_CONFERENCES,
    CLEAR_FILTER_CONFERENCES,
    CONFERENCE_ERROR,
    GET_CONFERENCES,
    CLEAR_CONFERENCES,
    GET_SECTIONS,
    SET_CURRENT_SECTION,
    CLEAR_CURRENT_SECTION,
    ADD_SECTION
  } from "../types";
  
  const conferenceReducer = (state, action) => {
    switch (action.type) {
      case GET_CONFERENCES:
        return {
          ...state,
          loading: false,
          conferences: action.payload,
          current: action.payload[0]
        };
      case GET_SECTIONS:
        return {
          ...state,
          loading: false,
          sections: action.payload,
          currentSection: action.payload[0]
        }

      case ADD_SECTION: 
        return {
          ...state,
          loading: false,
          sections: [action.payload, ...state.sections]
        }
  
      case ADD_CONFERENCE:
        return {
          ...state,
          conferences: [action.payload, ...state.conferences],
          loading: false,
        };
  
      case UPDATE_CONFERENCE:
        return {
          ...state,
          loading: false,
          conferences: state.conferences.map((conference) =>
            conference.id === action.payload.id ? action.payload : conference
          ),
        };
  
      case DELETE_CONFERENCE:
        return {
          ...state,
          loading: false,
          conferences: state.conference.filter(
            (conference) => conference.id !== action.payload
          ),
        };
  
      case CLEAR_CONFERENCES:
        return {
          ...state,
          conferences: null,
          filtered: null,
          error: null,
          current: null,
        };

      case SET_CURRENT_SECTION:
        return {
          ...state,
          currentSection: action.payload
        };

      case CLEAR_CURRENT_SECTION:
        return {
          ...state,
          currentSection: null
        }
  
      case SET_CURRENT:
        return {
          ...state,
          current: action.payload,
        };
  
      case CLEAR_CURRENT:
        return {
          ...state,
          current: null,
        };
  
      case FILTER_CONFERENCES:
        return {
          ...state,
          filtered: state.conferences.filter((conference) => {
            const regex = new RegExp(`${action.payload}`, `gi`);
            return conference.name.match(regex) || conference.location.match(regex);
          }),
        };
  
      case CLEAR_FILTER_CONFERENCES:
        return {
          ...state,
          filtered: null,
        };
  
      case CONFERENCE_ERROR:
        return {
          ...state,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };

  export default conferenceReducer;