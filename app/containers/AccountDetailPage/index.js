/**
 *
 * AccountDetailPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectAccountDetailPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import PartnerForm from './PartnerForm';

import { fetchInitialData as _fetchInitialData } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class AccountDetailPage extends React.Component {
  componentDidMount() {
    this.props.fetchInitialData(this.props.match.params.id);
  }

  render() {
    const { accountdetailpage } = this.props;

    return (
      <div>
        <Helmet>
          <title>AccountDetailPage</title>
          <meta name="description" content="Description of AccountDetailPage" />
        </Helmet>

        {accountdetailpage.partner && (
          <PartnerForm partner={accountdetailpage.partner} />
        )}
        <pre>{JSON.stringify(this.props.accountdetailpage, null, 2)}</pre>
      </div>
    );
  }
}

AccountDetailPage.propTypes = {
  fetchInitialData: PropTypes.func,
  match: PropTypes.any,
  accountdetailpage: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  accountdetailpage: makeSelectAccountDetailPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchInitialData: partnerId => {
      dispatch(_fetchInitialData(partnerId));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'accountDetailPage', reducer });
const withSaga = injectSaga({ key: 'accountDetailPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AccountDetailPage);
