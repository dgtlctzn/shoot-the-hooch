import React from "react";
import PropTypes from "prop-types";
import locations from "../../locations.json";
import "./Form.css";

const Form = ({ handleInputChange, handleSubmit }) => {
  return (
    <form id="master-form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-sm-10">
          <select
            id="search-form"
            className="form-control form-control-lg"
            onChange={handleInputChange}
          >
            {Object.keys(locations).map((location) => (
              <option value={location}>{location}</option>
            ))}
          </select>
        </div>
        <div className="col-sm-2">
          <button id="search-river" type="submit" className="btn btn-primary">
            Go!
          </button>
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  handleInputChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};

export default Form;
