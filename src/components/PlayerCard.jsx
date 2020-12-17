import React from "react";

import "./PlayerCard.css";

const PlayerCard = ({name, value}) => {
    let valueClass = value < 0 ? 'negative' : 'positive'
    let rowClass   = name === localStorage.getItem("username") ? 'bluesky-background' : '';

    return (
        <div className={`row ${rowClass}`}>
            <span className="user-name">{name}</span>
            <span className={`score-value ${valueClass}`}>{value}</span>
        </div>
    );
};

export default PlayerCard;
