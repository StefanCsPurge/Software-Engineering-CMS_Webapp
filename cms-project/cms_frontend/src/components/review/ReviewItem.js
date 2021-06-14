import React, { useContext } from "react";
import PropTypes from "prop-types";
import PaperContext from "../../context/papers/papersContext";
import AuthContext from "../../context/auth/authContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArchive, faPenAlt } from "@fortawesome/free-solid-svg-icons";

const ReviewItem = ({ paper }) => {
  

  const paperContext = useContext(PaperContext);
  const authContext = useContext(AuthContext);

  const { authorId, id, name, reviewResult } = paper;

  const { deletePaper, setCurrent, clearCurrent, papers } = paperContext;
  const { user } = authContext;

  const onDelete = () => {
    deletePaper(id);
    clearCurrent();
  };

  const style = user.id === authorId ? "border-finished" : ""

  return (
    <div className={`card bg-light ${style}`}>
      <h3 className="text-primary text-left">
        {name}{" "}
      </h3>
      <ul className="list">
        {authorId && (
          <li>
            <FontAwesomeIcon icon={faPenAlt}></FontAwesomeIcon>{" "}
            Id of the author: {authorId}
          </li>
        )}
        {id && (
          <li>
            <FontAwesomeIcon icon={faArchive}></FontAwesomeIcon>{" "}
            Id of the paper: {id}
          </li>
        )}
        {reviewResult && (
          <li>
            <FontAwesomeIcon icon={faArchive}></FontAwesomeIcon>{" "}
            Reviewer result: {reviewResult}
          </li>
        )}
      </ul>
      {user.isAdmin && (
      <p>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p> )
      }
    
      <p>
        <button
          className="btn btn-success btn-sm btn-press-success"
          onClick={() => setCurrent(paper)}>
          {user.id === authorId ? "Review my Paper" : "Review Paper"}
        </button>
      </p>

    </div>
  );
};

ReviewItem.propTypes = {
  paper: PropTypes.object.isRequired,
};

export default ReviewItem;