/**
 *
 * TransactionsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Select from 'react-select';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import TransactionsFilter from './TransactionFilter';
import FilterForm from './FilterForm';
// import AccountOverview from './AccountOverview';

import TransactionsList from './components/TransactionsList';
import Loading from './Loading';

import {
  makeSelectTransactionsFilterForm,
  // makeSelectTransactionsOverviewForm,
  makeSelectTransactions,
  makeSelectSorting,
  makeSelectLimit,
  makeSelectInitialFetch,
} from './selectors';

import * as actions from './actions';
import Pagination from './Pagination';
import colourStyles from '../../components/KitchenSink/colourStyle';
const {
  // updateOverviewForm,
  updateFilterForm: _updateFilterForm,
  fetchTransactions: _fetchTransactions,
  updateSorting: _updateSorting,
  updateLimit: _updateLimit,
} = actions;

/* eslint-disable react/prefer-stateless-function */
export class TransactionsPage extends React.Component {
  state = {
    dropDownToggle: false,
    id: '',
  };

  componentDidMount() {
    this.paginateTransactions(1);
  }

  paginateTransactions = page => {
    const { fetchTransactions } = this.props;
    fetchTransactions(page);
  };

  dropDownToggleHandler = id => {
    const { transactions } = this.props;
    transactions.data.find(transaction => {
      if (transaction._id === id) {
        return this.setState({
          dropDownToggle: !this.state.dropDownToggle,
          id,
        });
      }
      return null;
    });
  };

  closeDropDownHandler = () => {
    this.setState({ dropDownToggle: false });
  };

  render() {
    const limits = [
      { value: 25, label: '25' },
      { value: 50, label: '50' },
      { value: 100, label: '100' },
    ];

    const { limit, fetchTransactions, initialFetch } = this.props;

    if (initialFetch) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        <Helmet>
          <title>TransactionsPage</title>
          <meta name="description" content="Description of TransactionsPage" />
        </Helmet>

        <div className="columns">
          <div className="column">
            <TransactionsFilter>
              <FilterForm
                fetchTransactions={this.props.fetchTransactions}
                updateFilterForm={this.props.updateFilterForm}
              />
            </TransactionsFilter>
          </div>
        </div>

        {/* <div className="columns">
            <div className="column">
              <TransactionsHistory
                transactions={this.props.transactions.data}
                isFetching={this.props.transactions.isFetching}
                sorting={this.props.sorting}
                updateSorting={this.props.updateSorting}
              />
            </div>
          </div> */}

        <div style={{ marginBottom: 10 }}>
          Show
          <div
            style={{
              display: 'inline-block',
              width: 200,
              marginLeft: 20,
              marginRight: 20,
              position: 'relative',
              zIndex: 10,
            }}
          >
            <Select
              className="dropDownSelect"
              styles={colourStyles}
              options={limits}
              value={{ value: limit, label: limit.toString() }}
              onChange={e => {
                this.props.updateLimit(e.value);
                fetchTransactions(1);
              }}
            />
          </div>
          items
        </div>

        <TransactionsList
          transactions={this.props.transactions.data}
          sorting={this.props.sorting}
          updateSorting={this.props.updateSorting}
          dropDownToggle={this.state.dropDownToggle}
          dropDownToggleHandler={this.dropDownToggleHandler}
          id={this.state.id}
          closeDropDownHandler={this.closeDropDownHandler}
        />

        <Pagination
          pagination={this.props.transactions.pagination}
          fetchData={this.paginateTransactions}
          itemName="transactions"
          closeDropDownHandler={this.closeDropDownHandler}
        />
      </React.Fragment>
    );
  }
}

TransactionsPage.propTypes = {
  // overviewForm: PropTypes.object,
  fetchTransactions: PropTypes.func,
  transactions: PropTypes.object,
  updateFilterForm: PropTypes.func,
  sorting: PropTypes.any,
  updateSorting: PropTypes.func,
  updateLimit: PropTypes.func,
  limit: PropTypes.number,
  initialFetch: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  filterForm: makeSelectTransactionsFilterForm(),
  // overviewForm: makeSelectTransactionsOverviewForm(),
  transactions: makeSelectTransactions(),
  sorting: makeSelectSorting(),
  limit: makeSelectLimit(),
  initialFetch: makeSelectInitialFetch(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchTransactions: page => {
      dispatch(_fetchTransactions(page));
    },
    updateFilterForm: (name, value) => {
      dispatch(_updateFilterForm(name, value));
    },
    updateSorting: sorting => {
      dispatch(_updateSorting(sorting));
    },
    updateLimit: limit => {
      dispatch(_updateLimit(limit));
    },
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'transactionsPage', reducer });
const withSaga = injectSaga({ key: 'transactionsPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TransactionsPage);
