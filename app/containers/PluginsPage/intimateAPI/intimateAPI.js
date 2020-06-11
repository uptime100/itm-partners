import React from 'react';
import Select from 'react-select';
import H1 from '../../../components/H1';
import PropTypes from 'prop-types';
// import SecondaryButton from '../../components/SecondaryButton';

import PrimaryButton from '../../../components/PrimaryButton';
import IntimateAPIDetails from './intimateAPIDetails';

class IntimateAPI extends React.Component {
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

  getClientCredentials(clients) {
    const c = clients.find(client => client.isApiKey === true);

    if (!c) {
      return {
        clientId: '',
        clientSecret: '',
      };
    }
    return c;
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

    const pluginDetails = this.state.isToggleOn ? <IntimateAPIDetails /> : '';

    const { currentUser } = this.props;
    let clientCredentials = {
      clientId: '',
      clientSecret: '',
    };
    if (currentUser) {
      clientCredentials = this.getClientCredentials(currentUser.clients);
    }
    return (
      <React.Fragment>
        <H1>intimate API</H1>
        <div className="columns">
          <div className="column is-6">
            <form method="POST" onSubmit={this.props.onResetIntimateID}>
              <div className="columns">
                <div className="column is-5">
                  <input
                    className="input"
                    type="text"
                    placeholder="Client ID"
                    value={clientCredentials.clientId}
                  />
                </div>
                <div className="column is-5">
                  <input
                    className="input"
                    type="text"
                    placeholder="Client  Secret ID"
                    value={clientCredentials.clientSecret}
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

IntimateAPI.propTypes = {
  onResetIntimateID: PropTypes.func,
  currentUser: PropTypes.object,
};

export default IntimateAPI;
