import React from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";

import "./Home.css";

const Home = () => {
  const [userName, setUserName] = React.useState("");
  const [roomName, setRoomName] = React.useState("");
  const postNewCollection = async () => {
    await db.collection(roomName).doc(userName).set({
      name: userName,
      value: 0,
      createdAt: Date.now()
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    localStorage.clear()
    localStorage.setItem("username", userName)
  }

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };
  
  return (
    <div className="home-container">
       <input
        type="text"
        placeholder="User name"
        value={userName}
        onChange={handleUserNameChange}
        className="text-input-field"
        style={{marginBottom: "1em"}}
      />
      <input
        type="text"
        placeholder="Room"
        value={roomName}
        onChange={handleRoomNameChange}
        className="text-input-field"
      />
      <Link to={`room/${roomName}`} className="enter-room-button" onClick={postNewCollection}>
        Join room
      </Link>
    </div>
  );
};

export default Home;
