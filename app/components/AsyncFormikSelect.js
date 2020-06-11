import React from 'react';
import AsyncSelect from 'react-select/lib/Async';
import PropTypes from 'prop-types';
import colourStyles from '../components/KitchenSink/colourStyle';

class FormikSelect extends React.Component {
  handleChange = value => {
    // this is going to call setFieldValue and manually update values[fieldName]
    this.props.onChange(this.props.fieldName, value);
  };

  handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched[fieldName]
    this.props.onBlur(this.props.fieldName, true);
  };

  render() {
    return (
      <AsyncSelect
        loadOptions={this.props.loadOptions}
        cacheOptions={this.props.cacheOptions}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        value={this.props.value}
        className="control dropDownSelect"
        styles={colourStyles}
      />
    );
  }
}

FormikSelect.propTypes = {
  onChange: PropTypes.func,
  fieldName: PropTypes.string,
  onBlur: PropTypes.func,
  loadOptions: PropTypes.func,
  cacheOptions: PropTypes.func,
  value: PropTypes.any,
};

export default FormikSelect;
