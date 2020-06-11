import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import colourStyles from '../components/KitchenSink/colourStyle';

class FormikSelect extends React.Component {
  handleChange = value => {
    // this is going to call setFieldValue and manually update values[fieldName]
    const { updateFilterForm, fieldName, onChange } = this.props;
    if (updateFilterForm) {
      updateFilterForm(fieldName, value);
    }
    onChange(fieldName, value);
  };

  handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched[fieldName]
    this.props.onBlur(this.props.fieldName, true);
  };

  render() {
    return (
      <Select
        styles={colourStyles}
        className="dropDownSelect"
        options={this.props.options}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        value={this.props.value}
        isDisabled={this.props.disabled}
      />
    );
  }
}

FormikSelect.propTypes = {
  onChange: PropTypes.func,
  fieldName: PropTypes.string,
  onBlur: PropTypes.func,
  options: PropTypes.array,
  value: PropTypes.any,
  disabled: PropTypes.bool,
  updateFilterForm: PropTypes.func,
};

export default FormikSelect;
