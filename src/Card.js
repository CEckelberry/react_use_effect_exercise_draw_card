import React from "react";


const Card = ({key, image, value, suit, code}) => {
    return (
        <img key={key} src={image} value={value} suit={suit} code={code}></img>
    )

}

export default Card;