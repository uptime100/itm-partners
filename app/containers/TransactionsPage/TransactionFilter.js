import React from 'react';
import PropTypes from 'prop-types';

import H1 from '../../components/H1';

class TransactionsFilter extends React.Component {
  onTransactionSearch = e => {
    e.preventDefault();
  };

  onRefine = e => {
    e.preventDefault();

    const { fetchTransactions, filterForm } = this.props;
    fetchTransactions(filterForm);
  };

  render() {
    return (
      <div style={{ marginTop: ' 20px' }}>
        <H1>TRANSACTIONS</H1>
        <p style={{ position: 'relative', bottom: '15px' }}>
          Search and filter the transaction list below.
        </p>
        <div className="columns">
          <div className="column is-8">
            <div className="box">{this.props.children}</div>
          </div>

          {/* <div className="column is-4">
            <form className="box" onSubmit={e => e.preventDefault()}>
              <div className="columns">
                <div className="column transactSearch">
                  <div className="field has-addons">
                    <div className="control is-expanded">
                      <input
                        className="input"
                        type="text"
                        name="searchUsers"
                        placeholder="Search Transactions"
                      />
                    </div>
                    <div className="control">
                      <SecondaryButton>
                        <i className="fas fa-search" />
                      </SecondaryButton>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginBottom: '10px',
                  position: 'relative',
                  bottom: '5px',
                }}
              >
                <p>Export Current Data</p>
              </div>

              <div className="columns">
                <div className="column is-4">
                  <div className="exportTransactData">
                    <span>
                      <strong>DATA TYPE</strong>
                    </span>
                  </div>
                </div>
                <div className="column is-3 has-text-centered">
                  <i className="fas fa-file fa-2x" />
                </div>
                <div className="column is-5 has-text-right">
                  <SecondaryButton>DOWNLOAD DATA</SecondaryButton>
                </div>
              </div>
            </form>
          </div>
         */}
        </div>
      </div>
    );
  }
}

TransactionsFilter.propTypes = {
  children: PropTypes.any,
  fetchTransactions: PropTypes.any,
  filterForm: PropTypes.any,
};

export default TransactionsFilter;
