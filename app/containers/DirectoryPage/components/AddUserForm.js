import React from 'react';
import _ from 'lodash';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { post, get } from 'utils/api';

import FormikSelect from '../../../components/FormikSelect';
import AsyncFormikSelect from '../../../components/AsyncFormikSelect';

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
  loadOptions = (inputValue, callback) => {
    get(`/partners?q=${inputValue}`).then(res => {
      const options = res.data.docs.map(partner => ({
        value: partner._id,
        label: partner.name,
      }));
      callback(options);
    });
  };

  render() {
    const {
      errors,
      touched,
      isSubmitting,
      roles,
      values,
      setFieldTouched,
      setFieldValue,
      me,
      submitCount,
    } = this.props;

    const isIntimateUser =
      me.role.slug === 'SUPER_ADMIN' || me.role.slug === 'ADMIN';

    const partnerHasErrors =
      errors.partner && touched.partner && submitCount > 0;

    const mapping = {
      'Super Admin': 1,
      Admin: 2,
      Partner: 3,
      'Partner Manager': 4,
      'Partner Marketer': 5,
      'Partner Finance': 6,
    };

    const adminOnly = ['Super Admin', 'Admin', 'Partner'];

    let filteredRoles =
      values.partner.label === 'intimate'
        ? roles
        : roles.filter(role => !adminOnly.includes(role.label));

    filteredRoles = filteredRoles.map(filteredRole => ({
      ...filteredRole,
      order: mapping[filteredRole.label],
    }));

    filteredRoles = _.sortBy(filteredRoles, ['order']);

    return (
      <Form className="has-fixed-help-height">
        <div className="columns">
          <div className="column is-half">
            {isIntimateUser ? (
              <div className="field">
                <label htmlFor="name">
                  <strong>Partner Screen Name</strong>
                </label>

                <AsyncFormikSelect
                  loadOptions={this.loadOptions}
                  value={values.partner}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  error={errors.partner}
                  touched={touched.partner}
                  fieldName="partner"
                />
                {partnerHasErrors && (
                  <p className="help is-danger">{errors.partner}</p>
                )}
              </div>
            ) : (
              <div className="field">
                <label htmlFor="name">
                  <strong>Partner Screen Name</strong>
                </label>
                <div className="control">
                  <div style={{ position: 'relative', zIndex: 30 }}>
                    <FormikSelect
                      options={[
                        { value: me.partner._id, label: me.partner.name },
                      ]}
                      value={{ value: me.partner._id, label: me.partner.name }}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                      error={errors.partner}
                      touched={touched.partner}
                      fieldName="partner"
                      disabled
                    />
                  </div>
                </div>
                {partnerHasErrors && (
                  <p className="help is-danger">{errors.partner}</p>
                )}
              </div>
            )}

            <div className="field" style={{ marginTop: '18px' }}>
              <label htmlFor="">
                <strong>Role</strong>
              </label>
              <div style={{ position: 'relative', zIndex: 20 }}>
                <FormikSelect
                  options={filteredRoles}
                  value={values.role}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  error={errors.role}
                  touched={touched.role}
                  fieldName="role"
                />
              </div>
              {submitCount > 0 &&
                errors.role &&
                touched.role && <p className="help is-danger">{errors.role}</p>}
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
  touched: PropTypes.any,
  isSubmitting: PropTypes.any,
  roles: PropTypes.any,
  values: PropTypes.any,
  setFieldTouched: PropTypes.any,
  setFieldValue: PropTypes.any,
  me: PropTypes.any,
  submitCount: PropTypes.number,
};

const AddUserForm = withFormik({
  mapPropsToValues({ role, partner, email, name, me }) {
    const isIntimateUser =
      me.role.slug === 'SUPER_ADMIN' || me.role.slug === 'ADMIN';

    return {
      role: role || '',
      partner:
        partner ||
        (!isIntimateUser
          ? { value: me.partner._id, label: me.partner.name }
          : ''),
      email: email || '',
      name: name || '',
    };
  },
  handleSubmit(
    values,
    { setSubmitting, setErrors, resetForm, props, setTouched },
  ) {
    setTimeout(() => {
      post('/users/email', { email: values.email }).then(res => {
        if (!res.data.success) {
          // saga
          props.submitHandler(values);

          resetForm();
          setTouched(false);
        } else {
          setErrors({ email: 'Email is already taken' });
        }
        setSubmitting(false);
      });
    }, 300);
  },
  validationSchema: Yup.object().shape({
    partner: Yup.object()
      .required('Please select a Partner')
      .nullable('false'),
    role: Yup.object()
      .required('Please select a Role')
      .nullable('false'),
    email: Yup.string()
      .required('Email is required')
      .email('Please enter a valid email'),
    name: Yup.string().required('Contact Name is required'),
  }),
})(form);

export default AddUserForm;
