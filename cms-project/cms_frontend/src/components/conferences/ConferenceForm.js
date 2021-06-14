import React, { useContext, useState, useEffect } from "react";
import ConferenceContext from "../../context/conference/conferenceContext";
import AuthContext from "../../context/auth/authContext"
import { Button } from 'react-bootstrap';
import { Multiselect } from 'multiselect-react-dropdown';

const ConferenceForm = () => {
  const conferenceContext = useContext(ConferenceContext);
  const authContext = useContext(AuthContext)

  const { addConference, current, clearCurrent, updateConference, addPcMember } = conferenceContext;
  const { users, globalPermissions } = authContext;

  const [conference, setConference] = useState({
    id: 0,
    name: "",
    location: "",
    type: "Academic",
    details: "",
    preliminaryPhaseDeadline: "",
    firstPhaseDeadline: "",
    secondPhaseDeadline: "",
    bidDeadline: "",
    endDate: ""
  });

  const [chairs, setChairs] = useState([])
  const [pcMembers, setPcMembers] = useState([])

  let chairPermissions, pcPermissions;
  let nonChairUsers, nonPcUsers;

  useEffect(() => {
    authContext.getAllPermissions();
    if (current !== null) {
      setConference(current); 
    } else
      setConference({
        id: 0,
        name: "",
        location: "",
        type: "Academic",
        details: "",
        preliminaryPhaseDeadline: "",
        bidDeadline: "",
        firstPhaseDeadline: "",
        secondPhaseDeadline: "",
        endDate: ""
      });
      // eslint-disable-next-line
  }, [current, users]);

  if(current) {
    chairPermissions = globalPermissions.filter(perm => perm.permission === 'chair' && perm.conferenceId === current.id)
    pcPermissions = globalPermissions.filter(perm => perm.permission === 'pc'&& perm.conferenceId === current.id)

    nonChairUsers = users.filter(user => {
      let found = chairPermissions.filter(perm => perm.userId === user.id)
      if (found.length > 0)
        return false;
      return true
    })

    nonPcUsers = users.filter(user => {
      let found = pcPermissions.filter(perm => perm.userId === user.id)
      if (found.length > 0)
        return false;
      return true
    })
  }

  const { bidDeadline, name, location, type, details, preliminaryPhaseDeadline, firstPhaseDeadline, secondPhaseDeadline, endDate} = conference;

  const onChange = (e) =>
    setConference({ ...conference, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (current === null) {
      console.log(conference);
      addConference(conference);
      window.location.reload();
    } else {
      updateConference(conference);
      window.location.reload();
    }

    setConference({
      id: 0,
      name: "",
      location: "",
      type: "Academic",
      details: "",
      preliminaryPhaseDeadline: "",
      firstPhaseDeadline: "",
      secondPhaseDeadline: "",
      bidDeadline: "",
      endDate: ""
    });
  };

  const onSelectChair = (selectedList, selectedItem) => {
    setChairs([...chairs, selectedItem]);
  } 

  const onRemoveChair = (selectedList, selectedItem) => {
    setChairs(chairs.filter(chair => chair.id !== selectedItem.id))
  }

  const onSelectPcMember = (selectedList, selectedItem) => {
    setPcMembers(selectedList);
  }

  const onRemovePcMember = (selectedList, selectedItem) => {
    setChairs(pcMembers.filter(pcMember => pcMember.id !== selectedItem.id))
  }

  const addChairs = () => {
    chairs.map(chair => {
      let tba = {
        conferenceId: current.id,
        userId: chair.id,
        isChair: true
      }
      addPcMember(tba);
      return true;
    })
    window.location.reload();
  }

  const addPcMembers = () => {
    pcMembers.map(pcMember => {
      let tba = {
        conferenceId: current.id,
        userId: pcMember.id,
        isChair: false
      }
      addPcMember(tba);
      return true;
    })
    window.location.reload();
  }

  const clearAll = () => {
    clearCurrent();
  };

  return (<>
    <form action="" onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current ? "Edit Conference" : "Add Conference"}
      </h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="location"
        name="location"
        value={location}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="details"
        name="details"
        value={details}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="preliminaryPhaseDeadline"
        name="preliminaryPhaseDeadline"
        value={preliminaryPhaseDeadline}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="firstPhaseDeadline"
        name="firstPhaseDeadline"
        value={firstPhaseDeadline}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="bidDeadline"
        name="bidDeadline"
        value={bidDeadline}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="secondPhaseDeadline"
        name="secondPhaseDeadline"
        value={secondPhaseDeadline}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="endDate"
        name="endDate"
        value={endDate}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        id="Academic"
        value="Academic"
        checked={type === "Academic"}
        onChange={onChange}
      />{" "}
      Academic{" "}
      <input
        type="radio"
        name="type"
        id="Hobby"
        value="Hobby"
        checked={type === "Hobby"}
        onChange={onChange}
      />{" "}
      Hobby
      <div>
        <input
          type="submit"
          value={current ? "Update Conference" : "Add Conference"}
          className="btn btn-primary btn-block"
        />
      </div>
      
      {current && (
        <div>
          <button className="btn btn-white btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
    {current && (
    <>
      <Multiselect
        options={nonChairUsers} // Options to display in the dropdown
        selectedValues={[]} // Preselected value to persist in dropdown
        onSelect={onSelectChair} // Function will trigger on select event
        onRemove={onRemoveChair} // Function will trigger on remove event
        displayValue="username" // Property name to display in the dropdown options
        showCheckbox="true"
        showArrow="true"
        keepSearchTerm="true"
        id="chairInput"
      />

      <Button className={"btn-success"} onClick={addChairs} style = {{width: "100%", marginTop: "3px", marginBottom: "6px"}}>Add Chairs</Button>

      <Multiselect
        options={nonPcUsers} // Options to display in the dropdown
        selectedValues={[]} // Preselected value to persist in dropdown
        onSelect={onSelectPcMember} // Function will trigger on select event
        onRemove={onRemovePcMember} // Function will trigger on remove event
        displayValue="username" // Property name to display in the dropdown options
        showCheckbox="true"
        showArrow="true"
        keepSearchTerm="true"
        id="pcInput"
      />

      <Button className={"btn-danger"} onClick={addPcMembers} style = {{width: "100%", marginTop: "3px"}}>Add Pc Members</Button>
    </>
    )}
    </>      
  );
};

export default ConferenceForm;