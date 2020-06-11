import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import CompanyMoreDetails from './CompanyMoreDetails';
import woocommerce from '../../images/woocommerce-80.png';
import magento from '../../images/magento-80.png';
import shopify from '../../images/shopify-80.png';
import nats from '../../images/nats-80.png';
import { Link } from 'react-router-dom';

class CompanyDetailsRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: false, isDropDownOpened: false };
    this.handleClick = this.handleClick.bind(this);
    this.handleDropDown = this.handleDropDown.bind(this);
  }

  handleClick() {
    this.setState({
      isToggleOn: !this.state.isToggleOn,
    });
  }

  handleDropDown() {
    this.setState({
      isDropDownOpened: !this.state.isDropDownOpened,
    });
  }

  render() {
    const buttonIcon = this.state.isToggleOn ? (
      <span>
        <i className="fas fa-angle-up" />
      </span>
    ) : (
      <span>
        <i className="fas fa-angle-down" />
      </span>
    );
    let accordionContent;
    const { company } = this.props;

    const images = this.props.company.plugins.map(logo => {
      if (logo === 'woocommerce') {
        return (
          <img
            src={woocommerce}
            height="20%"
            width="20%"
            alt="woocommerce"
            className="imgRes"
          />
        );
      } else if (logo === 'magento') {
        return (
          <img
            src={magento}
            height="20%"
            width="20%"
            alt="magento"
            className="imgRes"
          />
        );
      } else if (logo === 'shopify') {
        return (
          <img
            src={shopify}
            height="20%"
            width="20%"
            alt="shopify"
            className="imgRes"
          />
        );
      } else if (logo === 'nats') {
        return (
          <img
            src={nats}
            height="20%"
            width="20%"
            alt="nats"
            className="imgRes"
          />
        );
      }
      return logo;
    });

    // console.log(this.props.company.plugins);

    if (this.state.isToggleOn) {
      const users = company.users.map((user, index) => (
        <CompanyMoreDetails user={user} key={index} />
      ));
      accordionContent = <React.Fragment>{users}</React.Fragment>;
    }

    const dropdown = this.state.isDropDownOpened
      ? 'dropdown is-active'
      : 'dropdown';
    return (
      <div style={{ fontSize: '1rem' }}>
        <div className="columns rowDetails">
          <div className="column is-2 has-text-left">
            <span className="detailsMobile">
              <strong>Name : </strong>
            </span>
            {company.companyName}
          </div>
          <div className="column is-3 has-text-left">
            <span className="detailsMobile">
              <strong>Category : </strong>
            </span>{' '}
            {company.categories.join(', ')}
          </div>
          <div className="column is-2 has-text-left">
            <span className="detailsMobilePlugins">
              <strong>Plugin Types : </strong>
            </span>{' '}
            {images}
          </div>
          <div className="column is-1 has-text-left">
            <span className="detailsMobile">
              <strong>Active Deals : </strong>
            </span>0
          </div>
          <div className="column is-1 has-text-left">
            <span className="detailsMobile">
              <strong>Country : </strong>
            </span>{' '}
            {company.primaryCountry}
          </div>
          <div className="column is-1 has-text-left">
            <span className="detailsMobile">
              <strong>Last Login : </strong>
            </span>{' '}
            2018-01-01
          </div>
          <div className="column is-2 has-text-left">
            <div className="columns reverse-row-order">
              <div className="column is-2 actionDisplay">
                <button onClick={this.handleClick}>{buttonIcon}</button>
              </div>
              <div className="column is-10 actionDisplay">
                <div className="selectSize has-text-centered">
                  <div className={dropdown}>
                    <div className="dropdown-trigger">
                      <button
                        className="button"
                        aria-haspopup="true"
                        aria-controls="dropdown-menu"
                        onClick={this.handleDropDown}
                      >
                        <span>Action</span>
                        <span className="icon is-small">
                          <i className="fas fa-angle-down" aria-hidden="true" />
                        </span>
                      </button>
                    </div>
                    <div
                      className="dropdown-menu"
                      id="dropdown-menu"
                      role="menu"
                    >
                      <div className="dropdown-content">
                        <Link
                          to={`/suspend/${company._id}`}
                          href={`/suspend/${company._id}`}
                          data-company={company._id}
                          className="dropdown-item"
                          onClick={this.props.onClickOpenSuspendModal}
                        >
                          Suspend
                        </Link>
                        <Link
                          className="dropdown-item"
                          to={`/account/${company._id}`}
                          href={`/account/${company._id}`}
                        >
                          Manage
                        </Link>
                        <Link
                          to={`/password/${company._id}`}
                          href={`/password/${company._id}`}
                          className="dropdown-item"
                        >
                          Password
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {accordionContent}
      </div>
    );
  }
}

CompanyDetailsRow.propTypes = {
  company: PropTypes.object,
  onClickOpenSuspendModal: PropTypes.func,
};

export default CompanyDetailsRow;
