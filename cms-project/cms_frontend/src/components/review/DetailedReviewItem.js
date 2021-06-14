import React, { useContext, useState, useEffect } from "react";
import PapersContext from "../../context/papers/papersContext";
import AuthContext from "../../context/auth/authContext";
import ConferenceContext from "../../context/conference/conferenceContext";
import ReviewPopup from "../review/ReviewPopup";
import { Button, Form } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignJustify,
  faPenAlt,
  faArchive,
  faBookReader,
  faBookmark,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";

const DetailedReviewItem = ({ currentPhase }) => {
  const [isOpen, setIsOpen] = useState(false);

  const papersContext = useContext(PapersContext);
  const authContext = useContext(AuthContext);
  const conferenceContext = useContext(ConferenceContext);

  const { permissions, loadUser, user } = authContext;
  const { current, bidPaper, reviewPaper } = papersContext;

  useEffect(() => {
    loadUser();

    if (current) {
      setPaper({
        abstractPaper: current.abstractPaper,
        authorId: user.id,
        conferenceId: conferenceContext.current.id,
        evaluator_id: "",
        fullPaper: current.topic,
        name: current.name,
        review_result: "",
        section_id: "",
        topic: current.topic,
        file: undefined,
      });
    } else {
      setPaper({
        abstractPaper: "",
        authorId: user.id,
        conferenceId: conferenceContext.current.id,
        evaluator_id: "",
        fullPaper: "",
        name: "",
        review_result: "",
        section_id: "",
        topic: "",
        file: undefined,
      });
    }
    // eslint-disable-next-line
  }, [current]);

  const findPermission = (tbf) => {
    const result = permissions.filter((perm) => perm.permission === tbf);
    return result.length > 0;
  };

  // const isListener = findPermission('listener')
  const isAuthor = findPermission("author");
  const isPc = findPermission("pc");
  // const isChair = findPermission('chair')

  const [bid, setBid] = useState("");
  const [review, setReview] = useState("");

  let conflict = false;
  if (current) {
    conflict = user.id === current.authorId;
  }

  const onBid = async (e) => {
    e.preventDefault();
    bidPaper({
      paperId: current.id,
      pcId: user.id,
      bid: bid,
    }).then(papersContext.getPapers(conferenceContext.current.id));
    papersContext.getPapers(conferenceContext.current.id);
  };

  const onReview = (e) => {
    e.preventDefault();
    reviewPaper({
      paperId: current.id,
      evaluatorId: user.id,
      review: review,
    });
  };

  const onChangeBid = (e) => setBid(e.target.value);

  const onChangeReview = (e) => setReview(e.target.value);

  const [paper, setPaper] = useState({
    abstractPaper: "",
    authorId: user.id,
    conferenceId: conferenceContext.current.id,
    evaluator_id: "",
    fullPaper: "",
    name: "",
    review_result: "",
    section_id: "",
    topic: "",
    file: undefined,
  });

  const {
    abstractPaper,
    authorId,
    conferenceId,
    fullPaper,
    name,
    topic,
    file,
  } = paper;

  const onChange = (e) =>
    setPaper({ ...paper, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    papersContext
      .updatePaper({
        id: current.id,
        ...paper,
      })
      .then(papersContext.getPapers(conferenceContext.current.id));
    papersContext.getPapers(conferenceContext.current.id);

    setPaper({
      abstractPaper: "",
      authorId: user.id,
      conferenceId: conferenceContext.current.id,
      evaluator_id: "",
      fullPaper: "",
      name: "",
      review_result: "",
      section_id: "",
      topic: "",
      file: undefined,
    });
  };

  const updatePaperForm = (
    <>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="formBasicDetails">
          <Form.Label>Abstract Paper</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter abstract of the paper"
            value={abstractPaper}
            name="abstractPaper"
            onChange={onChange}
          />
          <Form.Text className="text-muted">Abstract</Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicAuthors">
          <Form.Label>Author Id</Form.Label>
          <Form.Control
            type="text"
            placeholder="ID of the author"
            value={authorId}
            name="authorId"
            disabled={true}
            onChange={onChange}
          />
          Author ID is required
        </Form.Group>

        <Form.Group controlId="formBasicConference">
          <Form.Label>Conference Id</Form.Label>
          <Form.Control
            type="text"
            placeholder="ID of the conference"
            value={conferenceId}
            name="conferenceId"
            disabled={true}
            onChange={onChange}
          />
          Conference ID is required
        </Form.Group>

        <Form.Group controlId="formBasicName">
          <Form.Label>Name of the paper</Form.Label>
          <Form.Control
            type="text"
            placeholder="name of the paper"
            value={name}
            name="name"
            onChange={onChange}
          />
          Name is required
        </Form.Group>

        <Form.Group controlId="formBasicTopic">
          <Form.Label>Topic</Form.Label>
          <Form.Control
            type="text"
            placeholder="Topic"
            value={topic}
            name="topic"
            onChange={onChange}
          />
          Topic is required
        </Form.Group>

        <Form.Group controlId="formBasicFullPaper">
          <Form.Label>Full Paper</Form.Label>
          <Form.Control
            type="text"
            placeholder="content of the paper"
            value={fullPaper}
            name="fullPaper"
            onChange={onChange}
          />
          Content is required
        </Form.Group>

        <Form.Group>
          Select the Paper you want to upload
          <Form.File
            id="exampleFormControlFile1"
            value={file}
            name="file"
            onChange={onChange}
          />
        </Form.Group>

        <Button
          className={"btn-press"}
          style={{ width: "100%" }}
          variant="primary"
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </>
  );

  const biddingForm = (
    <>
      <Form onSubmit={onBid}>
        <Form.Group controlId="formBasicDetails">
          <Form.Label>Interest in reviewing the paper</Form.Label>
          <Form.Control
            as="select"
            placeholder="State your interest"
            value={bid}
            name="bid"
            onChange={onChangeBid}
          >
            <option>conflict</option>
            <option>refuse</option>
            <option>could</option>
            <option>pleased</option>
          </Form.Control>
          <Form.Text className="text-muted">Grade</Form.Text>
        </Form.Group>

        <Button
          disabled={conflict}
          className={`btn-press`}
          style={{ width: "100%" }}
          variant="primary"
          type="submit"
        >
          Bid
        </Button>
        {conflict && (
          <p style={{ color: "#dc3545" }}>
            The Bidding for this paper is currently disabled.
          </p>
        )}
      </Form>
    </>
  );

  const reviewForm = (
    <>
      <Form onSubmit={onReview}>
        <Form.Group controlId="formBasicDetails">
          <Form.Label>Review Statement: </Form.Label>
          <Form.Control
            as="select"
            placeholder="Review goes here"
            value={review}
            name="review"
            onChange={onChangeReview}
          >
            <option>strong-accept</option>
            <option>accect</option>
            <option>weak-accept</option>
            <option>borderline-paper</option>
            <option>weak-reject</option>
            <option>reject</option>
            <option>strong-reject</option>
          </Form.Control>
          <Form.Text className="text-muted">Grade</Form.Text>
        </Form.Group>

        <Button
          disabled={conflict}
          className={"btn-press"}
          style={{ width: "100%" }}
          variant="primary"
          type="submit"
        >
          Review
        </Button>
        {conflict && (
          <p style={{ color: "#dc3545" }}>
            The Bidding for this paper is currently disabled.
          </p>
        )}
      </Form>
    </>
  );

  return (
    <div className="card bg-light">
      {current && (
        <div>
          <h3 className="text-primary text-left">{current.name} </h3>
          <ul className="list">
            {current.authorId && (
              <li>
                <FontAwesomeIcon icon={faPenAlt}></FontAwesomeIcon> Id of the
                author: {current.authorId}
              </li>
            )}
            {current.id && (
              <li>
                <FontAwesomeIcon icon={faArchive}></FontAwesomeIcon> Id of the
                paper: {current.id}
              </li>
            )}
            {current.reviewResult && (
              <li>
                <FontAwesomeIcon icon={faReceipt}></FontAwesomeIcon> The result
                of the review is: {current.reviewResult}
              </li>
            )}

            {current.topic && (
              <li>
                <FontAwesomeIcon icon={faBookmark}></FontAwesomeIcon> Topic:{" "}
                {current.topic}
              </li>
            )}
            {current.abstractPaper && (
              <li>
                <FontAwesomeIcon icon={faAlignJustify}></FontAwesomeIcon>{" "}
                Abstract: {current.abstractPaper}
              </li>
            )}
            {current.fullPaper && (
              <li>
                <FontAwesomeIcon icon={faBookReader}></FontAwesomeIcon> Full
                Paper: {current.fullPaper}
              </li>
            )}
          </ul>
          <Button className={"btn-press"} onClick={() => setIsOpen(true)}>
            Preview
          </Button>
        </div>
      )}
      {isPc && currentPhase === "biddingPhase" && biddingForm}
      {isPc && currentPhase === "reviewPhase" && reviewForm}
      {isAuthor && updatePaperForm}
      {isOpen && (
        <ReviewPopup open={isOpen} onClose={() => setIsOpen(false)}>
          Stuff
        </ReviewPopup>
      )}
    </div>
  );
};

export default DetailedReviewItem;
