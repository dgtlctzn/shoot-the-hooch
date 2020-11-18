import React from "react";
import PropTypes from "prop-types";

const Form = ({handleInputChange, handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit}>
      <select className="form-control form-control-lg" onChange={handleInputChange}>
        <option value="02335815">North Atlanta</option>{/* 33.87 -84.34 northatlanta 02335815 */}
        <option value="52335815">Atlanta</option>{/* 35.87 -85.34 atlanta 52335815 */}
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
