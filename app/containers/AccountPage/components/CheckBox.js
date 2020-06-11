import React from 'react';
import PropTypes from 'prop-types';

class CheckBox extends React.Component {
  render() {
    const {
      value = '',
      onChange = () => {},
      checked = false,
      label = '',
      disabled = false,
    } = this.props;
    return (
      // <label className="checkbox checkboxMobile" style={{ marginRight: 20 }}>
      //   <input
      //     type="checkbox"
      //     value={value}
      //     checked={checked}
      //     onChange={onChange}
      //     style={{ marginRight: 5 }}
      //   />
      //   {label}
      // </label>
      <span>
        <input
          className="is-checkradio"
          id={label}
          type="checkbox"
          name="exampleCheckbox"
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />

        <label htmlFor={label}>{label}</label>
      </span>
    );
  }
}

CheckBox.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

export default CheckBox;
