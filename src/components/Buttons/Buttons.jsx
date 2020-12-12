import React from "react";
import "./Buttons.css"

const Buttons = ({ handleBackButton , handleNextButton}) => {
  return (
    <div className="btn-group" role="group" aria-label="Basic example">
      <button
        name="back"
        type="button"
        className="btn btn-primary"
        onClick={(e) => handleBackButton(e)}
      >
        <i class="fas fa-angle-left right-btn"></i>
      </button>
      <button
        name="next"
        type="button"
        className="btn btn-primary"
        onClick={(e) => handleNextButton(e)}
      >
        <i class="fas fa-angle-right right-btn"></i>
      </button>
    </div>
  );
};

export default Buttons;
