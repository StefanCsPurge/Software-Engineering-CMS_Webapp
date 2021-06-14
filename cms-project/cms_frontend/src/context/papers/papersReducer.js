import {
    CLEAR_PAPERS,
    FILTER_PAPERS,
    ADD_PAPER,
    GET_PAPERS,
    PAPER_ERROR,
    CLEAR_FILTER_PAPERS,
    SET_CURRENT,
    CLEAR_CURRENT
} from "../types"

const papersReducer = (state, action) => {
    switch (action.type) {
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }

        case CLEAR_PAPERS:
            return {
                ...state,
                papers: [],
                current: null
            }
        case FILTER_PAPERS:
            return {
                ...state,
                filtered: state.papers.filter((paper) => {
                    const regex = new RegExp(`${action.payload}`, `gi`);
                    return paper.name.match(regex) || paper.location.match(regex);
                })
            }
        case CLEAR_FILTER_PAPERS:
            return {
                ...state,
                filtered: null
            }
        case ADD_PAPER:
            return {
                ...state,
                papers: [action.payload, ...state.papers]
            }
        case GET_PAPERS:
            return {
                ...state,
                loading: false,
                papers: action.payload,
                current: action.payload[0]
            }
        case PAPER_ERROR:
            return {
                ...state,
                error: action.payload
            }

        default:
            return state
        
    }
}

export default papersReducer;