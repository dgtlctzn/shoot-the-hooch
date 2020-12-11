import React from "react";
import PropTypes from "prop-types";
import locations from "../../locations.json"

const Form = ({handleInputChange, handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit}>
      <select className="form-control form-control-lg" onChange={handleInputChange}>
        {locations.map(location => (
          <option value={location.site}>{location.name}</option>
        ))}
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
