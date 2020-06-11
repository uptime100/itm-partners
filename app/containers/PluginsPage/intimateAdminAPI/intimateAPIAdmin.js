import React from 'react';
import H1 from '../../../components/H1';
// import PropTypes from 'prop-types';
// import SecondaryButton from '../../components/SecondaryButton';
import PrimaryButton from '../../../components/PrimaryButton';
import IntimateAPIAdminDetails from './intimateAPIAdminDetails';

class IntimateAPIAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      isToggleOn: !this.state.isToggleOn,
    });
  }

  render() {
    const showDetails = this.state.isToggleOn ? (
      <span>
        <i className="fas fa-angle-up" />
      </span>
    ) : (
      <span>
        <i className="fas fa-angle-down" />
      </span>
    );

    const pluginDetails = this.state.isToggleOn ? (
      <div>
        <IntimateAPIAdminDetails />
        <div className="columns">
          <div className="column has-text-centered">
            <PrimaryButton>UPDATE</PrimaryButton>
          </div>
        </div>
      </div>
    ) : (
      ''
    );

    const currencies = this.state.isToggleOn ? <span>Currencies</span> : '';

    return (
      <div>
        <div className="columns">
          <div className="column is-10">
            <H1>intimate API - Admin</H1>
          </div>
          <div className="column is-2 has-text-right">
            <div style={{ position: 'relative', top: '80px' }}>
              <button onClick={this.handleClick}>{showDetails}</button>
            </div>
          </div>
        </div>
        <form>
          <div className="columns">
            <div className="column is-6">
              <div className="columns">
                <div className="column is-4">
                  <strong>Display Name</strong>
                </div>
                <div className="column is-8">
                  <input
                    className="input"
                    type="text"
                    placeholder=" Enter Display Name"
                  />
                </div>
              </div>
            </div>
            <div className="column is-6">
              <form>
                <div className="columns">
                  <div className="column is-9">
                    <strong>{currencies}</strong>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {pluginDetails}
        </form>
      </div>
    );
  }
}

export default IntimateAPIAdmin;
