import React from 'react';
import Select from 'react-select';
import H1 from '../../../components/H1';
import PropTypes from 'prop-types';
// import SecondaryButton from '../../components/SecondaryButton';
import PrimaryButton from '../../../components/PrimaryButton';
import WoocommerceAPIDetails from './WoocommerceAPIDetails';

class WoocommerceAPI extends React.Component {
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
      <WoocommerceAPIDetails />
    ) : (
      ''
    );

    const { name } = this.props;

    return (
      <React.Fragment>
        <H1>{name} API</H1>
        <div className="columns">
          <div className="column is-6">
            <form
              method="POST"
              onSubmit={e => {
                e.preventDefault();
              }}
            >
              <div className="columns">
                <div className="column is-5">
                  <input
                    className="input"
                    type="text"
                    placeholder="Client ID"
                    value={this.props.woocommerceClientID}
                  />
                </div>
                <div className="column is-5">
                  <input
                    className="input"
                    type="text"
                    placeholder="Client  Secret ID"
                    value={this.props.woocommerceClientSecretID}
                  />
                </div>
                <div className="column is-2">
                  <PrimaryButton>Reset</PrimaryButton>
                </div>
              </div>
            </form>
          </div>
          <div className="column is-5">
            <form>
              <div className="columns">
                <div className="column is-9">
                  <Select placeholder="January 2019" />
                </div>
                <div className="column is-3">
                  <PrimaryButton>Download Logs</PrimaryButton>
                </div>
              </div>
            </form>
          </div>
          <div className="column is-1 has-text-right">
            <div>
              <button onClick={this.handleClick}>{showDetails}</button>
            </div>
          </div>
        </div>

        {pluginDetails}
      </React.Fragment>
    );
  }
}

WoocommerceAPI.propTypes = {
  woocommerceClientID: PropTypes.string,
  name: PropTypes.string,
  woocommerceClientSecretID: PropTypes.string,
};

export default WoocommerceAPI;
