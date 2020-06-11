import React from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';

import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import injectReducer from 'utils/injectReducer';
import { removeToken } from 'utils/token';

import reducer from '../Callback/reducer';

import { setTokenDetails } from '../Callback/actions';
import { makeSelectTokenDetails } from '../Callback/selectors';

import Partners from './Partners';

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {
  componentDidMount() {}

  logout = () => {
    // TODO: MOVE TO utils/token
    removeToken();
    this.props.setTokenDetails(null);
  };

  render() {
    return (
      <section className="section">
        <Helmet>
          <title>Partner Portal</title>
          <meta name="description" content="" />
        </Helmet>
        <div className="container">
          <div className="columns">
            <div className="column" />
            <div className="column" />
          </div>

          <Partners />
        </div>
      </section>
    );
  }
}

HomePage.propTypes = {
  setTokenDetails: PropTypes.func,
};

const withReducer = injectReducer({ key: 'tokenDetails', reducer });

function mapDispatchToProps(dispatch) {
  return {
    setTokenDetails: tokenDetails => dispatch(setTokenDetails(tokenDetails)),
  };
}

const mapStateToProps = createStructuredSelector({
  tokenDetails: makeSelectTokenDetails(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withConnect,
)(HomePage);
