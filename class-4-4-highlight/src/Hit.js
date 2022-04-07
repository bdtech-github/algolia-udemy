import React from "react";
import { Highlight } from "react-instantsearch-dom";

const Hit = (props) => {
  return (
    <div>
      <img
        alt={props.hit.name}
        src={props.hit.image}
      />
      <div className="title">
        <Highlight
          attribute="name"
          hit={props.hit}
          tagName="mark"
          nonHighlightedTagName="span"
        />
      </div>
      <div className="price">£{props.hit.price}</div>
    </div>
  );
};

export default Hit;