import React from 'react';
import { withFormik, Form, Field } from 'formik';
// import * as Yup from 'yup';
import PropTypes from 'prop-types';
// import { post } from 'utils/api';

class form extends React.Component {
  render() {
    const { errors, touched, isSubmitting } = this.props;

    return (
      <Form>
        <div className="field">
          <label htmlFor="name">
            <strong>Partner Screen Name</strong>
          </label>
          <div className="control has-icons-right">
            <Field
              type="text"
              id="form-add-partner-focus"
              name="partnerScreenName"
              className={`input ${errors.partnerScreenName &&
                touched.partnerScreenName &&
                ' is-danger'}`}
              placeholder="Partner Screen Name"
              autoComplete="off"
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="name">
            <strong>Partner Name</strong>
          </label>
          <div className="control has-icons-right">
            <Field
              type="text"
              id="form-add-partner-focus"
              name="partnerName"
              className={`input ${errors.partnerName &&
                touched.partnerName &&
                ' is-danger'}`}
              placeholder="Partner Screen Name"
              autoComplete="off"
            />
          </div>
        </div>

        <button
          className="button is-primary"
          type="submit"
          disabled={isSubmitting}
        >
          Submit
        </button>
      </Form>
    );
  }
}

form.propTypes = {
  errors: PropTypes.any,
  isSubmitting: PropTypes.any,
  touched: PropTypes.any,
  // partner: PropTypes.any,
};

const PartnerForm = withFormik({
  mapPropsToValues({ partner }) {
    // console.log(partner);
    return {
      partnerScreenName: partner.name || '',
      partnerName: '',
    };
  },
  // handleSubmit(values, { setSubmitting, setErrors, resetForm, props }) {
  handleSubmit(values, { setSubmitting }) {
    // console.log(values);
    JSON.stringify(values);
    setSubmitting(false);
  },
})(form);

export default PartnerForm;
