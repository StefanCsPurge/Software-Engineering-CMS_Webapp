import React, { useEffect, useState, useContext } from 'react'
import ConferenceContext from "../../context/conference/conferenceContext"
import AuthContext from "../../context/auth/authContext"


const SectionForm = () => {

    const conferenceContext = useContext(ConferenceContext);
    const authContext = useContext(AuthContext);

    const {user, loadUser} = authContext;
    
    const { current, addSection } = conferenceContext;

    const [section, setSection] = useState({
        conferenceId: current.id,
        name: "",
        chairId: user.id
    })

    const { name, chairId, conferenceId } = section;
    
    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, [])

    const onChange = (e) =>
        setSection({ ...section, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        addSection(section);

        setSection({
            conferenceId: current.id,
            name: "",
            chairId: user.id
        })
    }

    return (
        <div>
            <form action="" onSubmit={onSubmit}>
        <h2 className="text-primary">
        {"Add Session"}
        </h2>
        <label>Session Name: </label>
        <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
        />
        <label>Id of the conference: </label>
        <input
            type="text"
            placeholder="conferenceId"
            name="conferenceId"
            disabled={true}
            value={conferenceId}
            onChange={onChange}
        />
        <label>Id of the chair: </label>
        <input
            type="text"
            placeholder="chairId"
            name="chairId"
            value={chairId}
            onChange={onChange}
        />
        
        <div>
            <input
            type="submit"
            value={"Add Session"}
            className="btn btn-primary btn-block btn-press"
            />
        </div>
        </form>
    </div>
    )
}

export default SectionForm
