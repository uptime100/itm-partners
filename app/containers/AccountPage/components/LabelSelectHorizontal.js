import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import colourStyles from '../../../components/KitchenSink/colourStyle';

const LabelSelectHorizontal = props => {
  const { options = [], name = '', placeholder = '', label } = props;
  return (
    <div className="field">
      <div className="columns">
        <div className="column is-6 is-6-mobile mobileRes">
          <label className="label">{label}</label>
        </div>

        <div className="column is-6 is-6-mobile mobileRes">
          <div className="field">
            <div className="control">
              <Select
                styles={colourStyles}
                className="dropDownSelect"
                options={options}
                name={name}
                placeholder={placeholder}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

LabelSelectHorizontal.propTypes = {
  options: PropTypes.any,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
};

export default LabelSelectHorizontal;
