import React from "react";
import PropTypes from "prop-types";

const Form = ({handleInputChange, handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit}>
      <select className="form-control form-control-lg" onChange={handleInputChange}>
        <option value="33.87 -84.34 northatlanta 02335815">North Atlanta</option>
        <option value="Atlanta">Atlanta</option>
      </select>
      <button type="submit" className="btn btn-primary">
        Shoot the Hooch!
      </button>
    </form>
  );
};

Form.propTypes = {
    handleInputChange: PropTypes.func,
    handleSubmit: PropTypes.func
};

export default Form;
