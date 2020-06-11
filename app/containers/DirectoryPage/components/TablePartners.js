import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import TablePartnersRow from './TablePartnersRow';
import Pagination from '../../../components/Pagination';

class TablePartners extends React.Component {
  state = {
    isToggle: false,
    id: '',
  };

  handleToggle = id => {
    this.setState({ isToggle: !this.state.isToggle, id });
  };

  updateSorting = columnName => {
    const { sorting, updateSorting } = this.props;
    updateSorting({
      column: columnName,
      value: sorting.column === columnName ? sorting.value * -1 : -1,
      page: 1,
    });
    this.setState({ isToggle: false });
  };

  renderHeader = columnName => {
    const { sorting } = this.props;
    if (sorting.column === columnName) {
      if (sorting.value === 1) {
        return <span style={{ fontWeight: 'bolder' }}> &uarr; </span>;
      }
      return <span style={{ fontWeight: 'bolder' }}> &darr; </span>;
    }
    return null;
  };

  renderHeaderStyle = columnName => {
    const { sorting } = this.props;
    if (sorting.column === columnName) {
      return {
        borderBottom: '2px solid white',
        display: 'flex',
        paddingBottom: 10,
        position: 'relative',
        top: 7,
        wordBreak: 'break-word',
      };
    }
    return {
      display: 'flex',
      paddingBottom: 10,
      position: 'relative',
      top: 7,
    };
  };

  render() {
    const { partners, me, fetchPartners, openSuspendPartnerModal } = this.props;
    const { isToggle, id } = this.state;
    return (
      <Fragment>
        <table className="table is-fullwidth table-container">
          <thead>
            <tr>
              <th
                style={{ width: '20%' }}
                onClick={() => {
                  this.updateSorting('name');
                }}
              >
                <span style={this.renderHeaderStyle('name')}>
                  Name
                  {this.renderHeader('name')}
                </span>
              </th>

              <th style={{ width: '30%' }} className="directoryMobile">
                Category
              </th>
              <th style={{ width: '20%' }} className="directoryMobile">
                Plugin Types
              </th>
              {/* <th style={{ width: '5%' }}>Active Deals</th> */}

              <th
                style={{ width: '10%' }}
                className="directoryMobile"
                onClick={() => {
                  this.updateSorting('primaryCountry');
                }}
              >
                <span style={this.renderHeaderStyle('primaryCountry')}>
                  Country
                  {this.renderHeader('primaryCountry')}
                </span>
              </th>

              <th
                style={{ width: '10%' }}
                className="has-text-centered-mobile"
                onClick={() => {
                  this.updateSorting('isActive');
                }}
              >
                <span style={this.renderHeaderStyle('isActive')}>
                  Status
                  {this.renderHeader('isActive')}
                </span>
              </th>
              {/* <th style={{ width: '5%' }}>Last Login</th> */}

              <th style={{ width: '10%' }} className="has-text-centered-mobile">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {partners.data.map((partner, key) => (
              <TablePartnersRow
                key={key}
                me={me}
                partner={partner}
                openSuspendPartnerModal={openSuspendPartnerModal}
                isToggle={isToggle}
                handleToggle={this.handleToggle}
                id={id}
              />
            ))}
          </tbody>
        </table>

        <Pagination
          pagination={partners.pagination}
          fetchData={fetchPartners}
          style={{ marginBottom: 16 }}
        />
      </Fragment>
    );
  }
}

TablePartners.propTypes = {
  partners: PropTypes.any,
  me: PropTypes.any,
  fetchPartners: PropTypes.func,
  openSuspendPartnerModal: PropTypes.func,
  sorting: PropTypes.object,
  updateSorting: PropTypes.func,
};

export default TablePartners;
