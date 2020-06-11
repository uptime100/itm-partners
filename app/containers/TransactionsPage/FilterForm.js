import React from 'react';
import { withFormik, Form, Field } from 'formik';
// import * as Yup from 'yup';
import PropTypes from 'prop-types';
// import { post } from 'utils/api';
import FormikSelect from '../../components/FormikSelect';
import moment from 'moment';
import 'react-datez/dist/css/react-datez.css';
import { ReactDatez } from 'react-datez';

class form extends React.Component {
  state = {
    startDate: '',
    endDate: '',
  };

  render() {
    const {
      errors,
      touched,
      isSubmitting,
      setFieldTouched,
      setFieldValue,
      values,
      updateFilterForm,
    } = this.props;

    const { startDate, endDate } = this.state;

    return (
      <Form>
        <div className="columns">
          <div className="column is-4">
            <div className="field">
              <label>DATE RANGE FROM</label>
              <div>
                <ReactDatez
                  value={startDate}
                  handleChange={date => {
                    this.setState({ startDate: date });
                    setFieldValue(
                      'startDate',
                      moment(date).format('YYYY-MM-DD'),
                    );
                    updateFilterForm(
                      'startDate',
                      moment(date).format('YYYY-MM-DD'),
                    );
                  }}
                  placeholder="YY.MM.DD"
                  dateFormat="YYYY-MM-DD"
                  allowPast
                  allowFuture
                />
              </div>
            </div>
          </div>

          <div className="column is-4">
            <div className="field">
              <label>DATE RANGE TO</label>
              <div>
                <ReactDatez
                  value={endDate}
                  handleChange={date => {
                    this.setState({ endDate: date });
                    setFieldValue('endDate', moment(date).format('YYYY-MM-DD'));
                    updateFilterForm(
                      'endDate',
                      moment(date).format('YYYY-MM-DD'),
                    );
                  }}
                  placeholder="YY.MM.DD"
                  dateFormat="YYYY-MM-DD"
                  allowPast
                  allowFuture
                />
              </div>
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column is-3">
            <div className="field">
              <label>AMOUNT FROM</label>
              <Field
                className="input amountPlaceholder"
                type="number"
                name="minTotal"
                placeholder="FROM"
                value={values.minTotal}
                onChange={e => {
                  setFieldValue('minTotal', e.target.value);
                  updateFilterForm('minTotal', e.target.value);
                }}
              />
            </div>
          </div>

          <div className="column is-3">
            <div className="field">
              <label>AMOUNT TO</label>
              <Field
                className="input amountPlaceholder"
                type="number"
                name="maxTotal"
                placeholder="TO"
                value={values.maxTotal}
                onChange={e => {
                  setFieldValue('maxTotal', e.target.value);
                  updateFilterForm('maxTotal', e.target.value);
                }}
              />
            </div>
          </div>

          <div className="column is-3">
            <div className="field">
              <label htmlFor="name">TYPE</label>
              <FormikSelect
                options={[
                  { value: 'all', label: 'ALL' },
                  { value: 'in', label: 'IN CRYPTO' },
                  { value: 'out', label: 'OUT CRYPTO' },
                ]}
                value={values.type}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.type}
                touched={touched.type}
                fieldName="type"
                updateFilterForm={updateFilterForm}
              />
              <p className="help is-danger">{errors.type}</p>
            </div>
          </div>

          <div
            className="column is-3"
            style={{ display: 'flex', alignItems: 'flex-end' }}
          >
            <button
              className="button is-primary"
              type="submit"
              disabled={isSubmitting}
              style={{ width: '100%', marginBottom: '5px' }}
            >
              Refine
            </button>
          </div>
        </div>
      </Form>
    );
  }
}

form.propTypes = {
  errors: PropTypes.any,
  isSubmitting: PropTypes.any,
  touched: PropTypes.any,
  setFieldValue: PropTypes.any,
  setFieldTouched: PropTypes.any,
  values: PropTypes.any,
  updateFilterForm: PropTypes.func,
};

const FilterForm = withFormik({
  mapPropsToValues({ type, startDate, endDate, minTotal, maxTotal }) {
    return {
      type: type || { value: 'all', label: 'ALL' },
      startDate: startDate || '',
      endDate: endDate || '',
      minTotal: minTotal || '',
      maxTotal: maxTotal || '',
    };
  },
  handleSubmit(values, { setSubmitting, props }) {
    const { fetchTransactions } = props;
    // const params = { ...values };
    // const filter = {};
    // for (const key in params) {
    //   if (!params[key]) {
    //     delete params[key];
    //   }
    // }

    // if (params.minTotal || params.maxTotal) {
    //   filter.total = {};
    //   if (params.minTotal) {
    //     filter.total.$gte = parseFloat(params.minTotal);
    //   }
    //   if (params.maxTotal) {
    //     filter.total.$lte = parseFloat(params.maxTotal);
    //   }
    // }

    // if (params.startDate || params.endDate) {
    //   filter.transactionDate = {};
    //   if (params.startDate) {
    //     filter.transactionDate.$gte = params.startDate;
    //   }
    //   if (params.endDate) {
    //     filter.transactionDate.$lte = `${params.endDate} 23:59:59`;
    //   }
    // }

    // if (params.type.value !== 'all') {
    //   filter.type = params.type.value;
    // }

    // const headerParams = encodeURI(JSON.stringify(filter));

    fetchTransactions();

    setSubmitting(false);
  },
})(form);

export default FilterForm;
