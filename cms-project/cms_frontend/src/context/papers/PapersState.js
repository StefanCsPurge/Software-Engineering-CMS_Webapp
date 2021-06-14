import React, { useReducer } from "react";
import PapersContext from "./papersContext";
import papersReducer from "./papersReducer";

import {
  CLEAR_PAPERS,
  FILTER_PAPERS,
  CLEAR_FILTER_PAPERS,
  UPDATE_PAPER,
  DELETE_PAPER,
  ADD_PAPER,
  GET_PAPERS,
  PAPER_ERROR,
  SET_CURRENT,
  CLEAR_CURRENT,
  REVIEW_PAPER,
  BID_PAPER,
} from "../types";
import axios from "axios";

const PapersState = (props) => {
  const initialState = {
    papers: [
      {
        paperId: 1,
        author: "AuthorNames1",
        name: "PaperName1",
        details: "Details1",
      },
      {
        paperId: 2,
        author: "AuthorNames2",
        name: "PaperName2",
        details: "Details2",
      },
    ],
    loading: false,
    current: {},
    filtered: [],
  };

  const [state, dispatch] = useReducer(papersReducer, initialState);

  // GET PAPERS
  const getPapers = async (id) => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    try {
      const res = await axios.get(
        `http://localhost:8080/api/papers/conference/${id}`,
        config
      );

      dispatch({ type: GET_PAPERS, payload: res.data });
    } catch (err) {
      dispatch({ type: PAPER_ERROR, payload: err });
    }
  };

  const getAcceptedPapers = async (id) => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    try {
      const res = await axios.get(
        `http://localhost:8080/api/papers/reviewer/accepted/${id}`,
        config
      );

      dispatch({ type: GET_PAPERS, payload: res.data });
    } catch (err) {
      dispatch({ type: PAPER_ERROR, payload: err });
    }
  };

  // ADD PAPER
  const addPaper = async (paper) => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    try {
      const res = await axios.post(
        "http://localhost:8080/api/papers",
        paper,
        config
      );

      dispatch({ type: ADD_PAPER, payload: res.data });
    } catch (err) {
      dispatch({ type: PAPER_ERROR, payload: err });
    }
  };

  // DELETE PAPER
  const deletePaper = async (id) => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    try {
      await axios.delete(`/api/papers/${id}`, config);

      dispatch({ type: DELETE_PAPER, payload: id });
    } catch (err) {
      dispatch({ type: PAPER_ERROR, payload: err });
    }
  };

  // UPDATE PAPER
  const updatePaper = async (paper) => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    try {
      const res = await axios.put(
        `http://localhost:8080/api/papers/`,
        paper,
        config
      );

      dispatch({ type: UPDATE_PAPER, payload: res.data });
    } catch (err) {
      dispatch({ type: PAPER_ERROR, payload: err });
    }
  };

  // BID PAPER
  const bidPaper = async (bid) => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    try {
      const res = await axios.post(
        `http://localhost:8080/api/papers/bid`,
        bid,
        config
      );

      dispatch({ type: BID_PAPER, payload: res.data });
    } catch (err) {
      dispatch({ type: PAPER_ERROR, payload: err });
    }
  };

  const reviewPaper = async (review) => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    try {
      const res = await axios.post(
        `http://localhost:8080/api/papers/review`,
        review,
        config
      );

      dispatch({ type: REVIEW_PAPER, payload: res.data });
    } catch (err) {
      dispatch({ type: PAPER_ERROR, payload: err });
    }
  };

  // CLEAR PAPERS
  const clearPapers = () => {
    dispatch({ type: CLEAR_PAPERS });
  };

  // FILTER PAPERS
  const filterPapers = (text) => {
    dispatch({ type: FILTER_PAPERS, payload: text });
  };

  // CLEAR FILTER PAPERS
  const clearFilterPapers = () => {
    dispatch({ type: CLEAR_FILTER_PAPERS });
  };

  // SET CURRENT PAPER
  const setCurrent = (paper) => {
    dispatch({ type: SET_CURRENT, payload: paper });
  };

  // clearCurrent
  const clearCurrent = () => {
    dispatch({ CLEAR_CURRENT });
  };

  return (
    <PapersContext.Provider
      value={{
        papers: state.papers,
        error: state.error,
        filtered: state.filtered,
        current: state.current,
        addPaper,
        deletePaper,
        updatePaper,
        getPapers,
        filterPapers,
        clearFilterPapers,
        clearPapers,
        setCurrent,
        clearCurrent,
        bidPaper,
        reviewPaper,
        getAcceptedPapers,
      }}
    >
      {props.children}
    </PapersContext.Provider>
  );
};

export default PapersState;
