import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import { setToken } from 'utils/token';

import { setTokenDetails } from './actions';
import reducer from './reducer';
import { makeSelectTokenDetails } from './selectors';

class Callback extends PureComponent {
  componentDidMount() {
    if (window.location.search) {
      const tokenDetails = queryString.parse(
        window.location.search.replace('?', ''),
      );
      setToken(tokenDetails);
      this.props.setTokenDetails(tokenDetails);
    }
  }

  render() {
    if (this.props.tokenDetails) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <h1>Unauthorized!</h1>
      </div>
    );
  }
}

Callback.propTypes = {
  setTokenDetails: PropTypes.func,
  tokenDetails: PropTypes.object,
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
)(Callback);
