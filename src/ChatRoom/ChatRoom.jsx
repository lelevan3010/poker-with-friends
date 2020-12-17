/* eslint eqeqeq: 0 */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';

import "./ChatRoom.css";
import { db } from "../firebase";
import PlayerCard from '../components/PlayerCard'

const ChatRoom = (props) => {
  const { roomId } = props.match.params;
  const [inputValue, setInputValue] = useState("");
  const [submited, setSubmited] = useState(false);
  let userName = localStorage.getItem("username");
  let isDisabled = Number(inputValue) == inputValue ? false : true;
  let invalidInputClass = Number(inputValue) == inputValue || inputValue == '-' ? '' : 'invalid-input';
  let validationVisibilityAttr = Number(inputValue) == inputValue  || inputValue == '-' ? 'hidden' : '';
  let updatedVisibilityAttr = submited ? '' : 'hidden';
  
  const [data, dataLoading] = useCollectionData(
    db.collection(roomId),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  let docPath = localStorage.getItem("username") ? userName : "1got the error1"
  const [userData] = useDocumentData(
    db.collection(roomId).doc(docPath),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const handleValueChange = (e) => {
    setInputValue(e.target.value);
  }

  const popupUpdatedMsg = () => {
    setSubmited(true);
    setTimeout(() => {
      setSubmited(false)
    }, 2000);
  }

  const handleSendValue = async () => {
    await db.collection(roomId).doc(userName).update({
      value: Number((parseFloat(userData.value) + parseFloat(inputValue)).toFixed(1)),
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    popupUpdatedMsg();
    setInputValue("");
  }

  if(!userData){
    return (<p style={{textAlign: "center", top: "50%"}}>Loading...</p>)
  } else {
    return (
      <div className="chat-room-container">
        <div className="chat-room-head">
          <div>
            <h1 className="room-name">Room: {roomId}</h1>
            <h2 className="display-name">Name: {userName}</h2>
          </div>
            <button className="back-button">
              <Link to={'/'} className="" >
                Back
              </Link>
            </button>
        </div>
        <div className="messages-container">
          {
            dataLoading 
            ? <p style={{textAlign: "center", top: "50%"}}>Loading...</p>
            : data.map((el, idx) => {
              return <PlayerCard key={idx} name={el.name} value={el.value}/>
            })
          }
        </div>
        <textarea
          value={inputValue}
          onChange={handleValueChange}
          placeholder="Enter number"
          className={`new-message-input-field  ${invalidInputClass}`}
        />
        <span className="snackbar" style={{"visibility": validationVisibilityAttr}}>Please enter number!</span>
        <span className="snackbar" style={{"visibility": updatedVisibilityAttr, "backgroundColor": "#31a24c"}}>Succeed update!</span>
        <button onClick={handleSendValue} className="send-message-button" disabled={isDisabled}>
          Submit
        </button>
      </div>
    );
  }
};

export default ChatRoom;
