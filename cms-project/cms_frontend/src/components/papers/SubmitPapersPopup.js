import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import Modal from 'react-overlays/Modal'
import { Button, Form} from 'react-bootstrap';
import PapersContext from '../../context/papers/papersContext'
import ConferenceContext from '../../context/conference/conferenceContext'
import AuthContext from '../../context/auth/authContext'

const Backdrop = styled("div")`
  position: fixed;
  z-index: 1040;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
  opacity: 0.5;
`;

// we use some pseudo random coords so nested modals
// don't sit right on top of each other.
const SubmitModal = styled(Modal)`
  position: fixed;
  width: 50%;
  z-index: 1040;
  top: 10%;
  left: 25%;
  border: 1px solid #e5e5e5;
  background-color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  padding: 20px;
`;

const SubmitPaperPopup = ({open, children, onClose}) => {

    const papersContext = useContext(PapersContext)
    const conferenceContext = useContext(ConferenceContext)
    const authContext = useContext(AuthContext)

    const {addPaper} = papersContext;
    const {addAuthor, current} = conferenceContext;
    const {user} = authContext;


    const [agree, setAgree] = useState(false);
    const [paper, setPaper] = useState({
        abstractPaper: "",
        authorId: user.id,
        conferenceId: current.id,
        evaluator_id: "",
        fullPaper: "",
        name: "",
        review_result: "",
        section_id: "",
        topic: "",
        file: undefined
    })

    const {abstractPaper, authorId, conferenceId, fullPaper, name, topic, file} = paper;

    const renderBackdrop = (props) => <Backdrop {...props} />;

    const onChange = (e) =>
        setPaper({ ...paper, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        if(agree){
            addPaper({
                ...paper
            });
            console.log("adding author");
            addAuthor({conferenceId: current.id, userId: user.id});
            //window.location.reload();
        }
        setPaper({
            abstractPaper: "",
            authorId: user.id,
            conferenceId: current.id,
            evaluator_id: "",
            fullPaper: "",
            name: "",
            review_result: "",
            section_id: "",
            topic: "",
            file: undefined
        })
    }

    return (
        <div className="modal-example">
            <SubmitModal
                show={open}
                onHide={() => onClose()}
                renderBackdrop={renderBackdrop}
                aria-labelledby="modal-label"
            >
                <div>
                    <Form onSubmit={onSubmit}>
                        <Form.Group controlId="formBasicDetails">
                            <Form.Label>Abstract Paper</Form.Label>
                            <Form.Control type="text" placeholder="Enter abstract of the paper" 
                            value={abstractPaper} 
                            name="abstractPaper"
                            onChange={onChange}/>
                            <Form.Text className="text-muted">
                            Abstract
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicAuthors">
                            <Form.Label>Author Id</Form.Label>
                            <Form.Control type="text" placeholder="ID of the author" 
                            value={authorId}
                            name="authorId"
                            disabled={true}
                            onChange={onChange}/>
                            Author ID is required
                        </Form.Group>

                        <Form.Group controlId="formBasicConference">
                            <Form.Label>Conference Id</Form.Label>
                            <Form.Control type="text" placeholder="ID of the conference" 
                            value={conferenceId}
                            name="conferenceId"
                            disabled={true}
                            onChange={onChange}/>
                            Conference ID is required
                        </Form.Group>

                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name of the paper</Form.Label>
                            <Form.Control type="text" placeholder="name of the paper" 
                            value={name}
                            name="name"
                            onChange={onChange}/>
                            Name is required
                        </Form.Group>

                        <Form.Group controlId="formBasicTopic">
                            <Form.Label>Topic</Form.Label>
                            <Form.Control type="text" placeholder="Topic" 
                            value={topic}
                            name="topic"
                            onChange={onChange}/>
                            Topic is required
                        </Form.Group>

                        <Form.Group controlId="formBasicFullPaper">
                            <Form.Label>Full Paper</Form.Label>
                            <Form.Control type="text" placeholder="content of the paper" 
                            value={fullPaper}
                            name="fullPaper"
                            onChange={onChange}/>
                            Content is required
                        </Form.Group>

                        <Form.Group>
                            Select the Paper you want to upload
                            <Form.File id="exampleFormControlFile1"
                            value={file}
                            name="file"
                            onChange={onChange}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label=" agree with the TOS?" 
                            onClick={() => {setAgree(!agree)}}
                            value={file}/>
                        </Form.Group>

                        <Button className={"btn-press"} style={{width: "100%"}} variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </SubmitModal>
        </div>
    )
}

export default SubmitPaperPopup
