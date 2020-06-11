import React from 'react';
import PropTypes from 'prop-types';

const LabelInputText = props => {
  const {
    label,
    placeholder,
    value,
    onChange,
    onBlur = () => {},
    type = 'text',
  } = props;
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input
          className="input"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
    </div>
  );
};

LabelInputText.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  type: PropTypes.string,
};

export default LabelInputText;
