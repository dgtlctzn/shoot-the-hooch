import React from "react";
import PropTypes from "prop-types";

const Form = ({handleInputChange, handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit}>
      <select className="form-control form-control-lg" onChange={handleInputChange}>
        <option value="North Atlanta">North Atlanta</option>
        <option value="Atlanta">Atlanta</option>
      </select>
      <button type="submit" className="btn btn-primary">
        Shoot the Hooch!
      </button>
    </form>
  );
};

Form.propTypes = {};

export default Form;
