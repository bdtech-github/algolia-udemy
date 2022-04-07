import React from "react";

const Hit = (props) => {

  return (
    <div>
       <img
        alt={props.hit.name}
        src={props.hit.image}
      />
      <div className="title">
       <span>{props.hit.name}</span>
      </div>
      <div className="price">${props.hit.price}</div>
    </div>
  );
};

export default Hit;