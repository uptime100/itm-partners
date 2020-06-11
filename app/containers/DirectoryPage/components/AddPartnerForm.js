import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { post } from 'utils/api';

const IconCheck = () => (
  <span className="icon is-small is-right">
    <i className="fas fa-check" />
  </span>
);

const IconWarning = () => (
  <span className="icon is-small is-right">
    <i className="fas fa-exclamation-triangle" />
  </span>
);

class form extends React.Component {
  render() {
    const { errors, touched, isSubmitting, submitCount } = this.props;
    // console.log('RENDER OF FORM', this.props);

    const partnerHasErrors =
      errors.partnerName && touched.partnerName && submitCount > 0;

    return (
      <Form className="has-fixed-help-height">
        <div className="columns">
          <div className="column is-half">
            <div className="field">
              <label htmlFor="name">
                <strong>Partner Screen Name</strong>
              </label>
              <div className="control has-icons-right">
                <Field
                  type="text"
                  id="form-add-partner-focus"
                  name="partnerName"
                  className={`input ${errors.partnerName &&
                    touched.partnerName &&
                    submitCount > 0 &&
                    ' is-danger'}`}
                  placeholder="Partner Screen Name"
                  autoComplete="off"
                />
                {submitCount > 0 &&
                  !errors.partnerName &&
                  touched.partnerName && <IconCheck />}
                {submitCount > 0 && partnerHasErrors && <IconWarning />}
                {partnerHasErrors && (
                  <p className="help is-danger">{errors.partnerName}</p>
                )}
              </div>
            </div>

            <div className="field inputSpaces">
              <label>
                <strong>Role</strong>
              </label>
              <input
                className="input"
                type="text"
                disabled
                placeholder="Partner"
              />
            </div>
          </div>

          <div className="column is-half">
            <div className="field">
              <label htmlFor="name">
                <strong>Email Address</strong>
              </label>
              <div className="control has-icons-right">
                <Field
                  type="text"
                  name="email"
                  className={`input ${errors.email &&
                    touched.email &&
                    submitCount > 0 &&
                    ' is-danger'}`}
                  placeholder="Email Address"
                  autoComplete="off"
                />
                {submitCount > 0 &&
                  !errors.email &&
                  touched.email && <IconCheck />}
                {submitCount > 0 &&
                  errors.email &&
                  touched.email && <IconWarning />}
                {submitCount > 0 &&
                  errors.email &&
                  (touched.email && (
                    <p className="help is-danger">{errors.email}</p>
                  ))}
              </div>
            </div>

            <div className="field inputSpaces">
              <label htmlFor="name">
                <strong>Primary Contact Name</strong>
              </label>
              <div className="control has-icons-right">
                <Field
                  type="text"
                  name="name"
                  className={`input ${errors.name &&
                    touched.name &&
                    submitCount > 0 &&
                    ' is-danger'}`}
                  placeholder="Primary Contact Name"
                  autoComplete="off"
                />
                {submitCount > 0 &&
                  !errors.name &&
                  touched.name && <IconCheck />}
                {submitCount > 0 &&
                  errors.name &&
                  touched.name && <IconWarning />}
                {submitCount > 0 &&
                  errors.name &&
                  (touched.name && (
                    <p className="help is-danger">{errors.name}</p>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className="row-justify-content-flex-end">
          <button
            className="button is-primary"
            type="submit"
            disabled={isSubmitting}
          >
            Submit
          </button>
        </div>
      </Form>
    );
  }
}

form.propTypes = {
  errors: PropTypes.any,
  isSubmitting: PropTypes.any,
  touched: PropTypes.any,
  submitCount: PropTypes.number,
};

const AddUserForm = withFormik({
  mapPropsToValues({ partnerName, email, name }) {
    return {
      partnerName: partnerName || '',
      email: email || '',
      name: name || '',
    };
  },
  handleSubmit(values, { setSubmitting, setErrors, resetForm, props }) {
    setTimeout(() => {
      post('/users/email', { email: values.email }).then(res => {
        if (!res.data.success) {
          // saga
          // document.getElementById('form-add-partner-focus').focus()
          props.submitHandler(values);

          resetForm();
        } else {
          setErrors({ email: 'Email is already taken' });
        }
        setSubmitting(false);
      });
    }, 300);
  },
  validationSchema: Yup.object().shape({
    partnerName: Yup.string().required('Partner Screen Name is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Please enter a valid email'),
    name: Yup.string().required('Partner Name is required'),
  }),
})(form);

export default AddUserForm;
