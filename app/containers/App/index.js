/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import styled from 'styled-components';
import { Switch, Route, Router } from 'react-router-dom';

import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

// import HomePage from 'containers/Home';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import DirectoryPage from '../DirectoryPage';
import AccountPage from '../AccountPage';
import HelpPage from '../HelpPage';
import Header from 'components/HeaderNew';
import Footer from 'components/FooterNew';
import PageWrapper from 'components/PageWrapper';
import FooterCollapsed from 'components/FooterNew/FooterCollapsed';
import Callback from 'containers/Callback';
import PermissionsPage from 'containers/PermissionsPage';
import Loading from './Loading';
import { setToken, getToken, removeToken } from 'utils/token';
import history from 'utils/history';
import IdleTimer from 'react-idle-timer';

import TransactionsPage from '../TransactionsPage';
import PluginsPage from '../PluginsPage';
// import Marketing from '../Marketing';
import Config from 'utils/getEnvConfig';
import saga from './saga';
import reducer from './reducer';
import { makeSelectCurrentUser, makeSelectIdleState } from './selectors';
import { getCurrentUser, setIdleStatus as _setIdleStatus } from './actions';
import KitchenSink from '../../components/KitchenSink';
import { ToastContainer } from 'react-toastify';
import Modal from '../../components/Modal';
import 'react-toastify/dist/ReactToastify.css';
import Disclaimer from './Disclaimer';
import refreshToken from './refreshToken';

// const AppWrapper = styled.div`
//   margin: 0 auto;
//   display: flex;
//   min-height: 100%;
//   flex-direction: column;
// `;

class App extends React.Component {
  toggleDisclaimerModal = () => {
    this.setState(state => ({
      isDisclaimerModalActive: !state.isDisclaimerModalActive,
    }));
  };

  closeDisclaimerModal = () => {
    this.setState({
      isDisclaimerModalActive: false,
    });
  };

  constructor(props) {
    super(props);
    this.idleTimer = null;
    this.onAction = this._onAction.bind(this);
    this.onActive = this._onActive.bind(this);
    this.onIdle = this._onIdle.bind(this);

    this.state = {
      isActive: false,
      isDisclaimerModalActive: false,
    };
  }

  logout = () => {
    removeToken();
    window.location.href = `${
      Config.API_URL
    }/oauth/authorise?client_id=partners&grant_type=implicit&session_expired`;
  };

  _onAction = () => {};

  _onActive = () => {
    // console.log('user is active', e)
    // console.log('time remaining', this.idleTimer.getRemainingTime())
    // this.props._setIdleStatus(false);
  };

  _onIdle = () => {
    // console.log('user is idle', e)
    // console.log('last active', this.idleTimer.getLastActiveTime())
    this.props._setIdleStatus(true);
  };

  toggle = () => {
    this.setState(state => ({
      isActive: !state.isActive,
    }));
  };

  handleBlur = () => {
    this.setState({
      isActive: false,
    });
  };

  componentDidMount() {
    window.getToken = getToken;
    const tokenDetails = getToken();

    let excludes = ['/callback', '/help'];

    if (tokenDetails) {
      // TODO: save tokenDetails to redux
      setToken(tokenDetails);
    } else if (!excludes.includes(window.location.pathname)) {
      // redirect if not in path /callback
      window.location.href = `${
        Config.API_URL
      }/oauth/authorise?client_id=partners&grant_type=implicit`;
      return null;
    }
    try {
      this.props.getCurrentUser();
    } catch (e) {}

    // SET INTERVAL
    let intervalMs = 1000 * 60 * 9;
    this.refreshInterval = setInterval(() => {
      if (!this.props.isIdle) {
        let tokenResponse = getToken();
        refreshToken(tokenResponse.refresh_token);
      }
    }, intervalMs);

    return true;
  }

  closeIdleModal = () => {
    this.props._setIdleStatus(false);
  };

  render() {
    const tokenDetails = getToken();

    const pageWrapRoutes = tokenDetails ? (
      <div
        onTouchStart={() => this.setState({ isActive: false })}
        onTouchEnd={() => this.setState({ isActive: false })}
      >
        <PageWrapper>
          <Switch>
            <Route exact path="/" component={TransactionsPage} />
            <Route path="/callback" component={Callback} />
            <Route path="/partners" component={DirectoryPage} />
            <Route path="/plugins" component={PluginsPage} />
            <Route path="/account/:id" component={AccountPage} />
            <Route path="/permissions" component={PermissionsPage} />
            <Route path="/transactions" component={TransactionsPage} />
            <Route path="/toolkit" component={KitchenSink} />
            <Route path="/help" component={HelpPage} />
            <Route path="" component={NotFoundPage} />
          </Switch>
        </PageWrapper>
      </div>
    ) : (
      <PageWrapper>
        <Switch>
          <Route exact path="/" component={Loading} />
          <Route path="/callback" component={Callback} />
        </Switch>
      </PageWrapper>
    );

    return (
      <Router history={history}>
        <Fragment>
          <Helmet titleTemplate="%s" defaultTitle="Partner Portal">
            <meta name="description" content="" />
          </Helmet>
          {tokenDetails && (
            <Header
              currentUser={this.props.currentUser}
              isActive={this.state.isActive}
              toggle={this.toggle}
            />
          )}

          {pageWrapRoutes}

          {tokenDetails && (
            <Fragment>
              <FooterCollapsed />
              <Footer toggleDisclaimerModal={this.toggleDisclaimerModal} />
              <ToastContainer hideProgressBar />
              <Disclaimer
                isDisclaimerModalActive={this.state.isDisclaimerModalActive}
                closeDisclaimerModal={this.closeDisclaimerModal}
              />
            </Fragment>
          )}
          <IdleTimer
            ref={ref => {
              this.idleTimer = ref;
            }}
            element={document}
            onActive={this.onActive}
            onIdle={this.onIdle}
            onAction={this.onAction}
            debounce={250}
            timeout={1000 * 60 * 10}
          />
          <Modal
            visible={this.props.isIdle}
            toggle={this.closeIdleModal}
            closeOnBackgroundClick={false}
            hasCloseButton={false}
          >
            <p style={{ textAlign: 'center' }}>
              You have been idle for 10 minutes.
            </p>
            <div
              style={{
                marginTop: 16,
                textAlign: 'center',
              }}
            >
              <button className="button is-primary" onClick={this.logout}>
                Click here to login
              </button>
            </div>
          </Modal>
        </Fragment>
      </Router>
    );
  }
}

App.propTypes = {
  currentUser: PropTypes.object,
  getCurrentUser: PropTypes.func,
  _setIdleStatus: PropTypes.func,
  isIdle: PropTypes.bool,
};

function mapDispatchToProps(dispatch) {
  return {
    getCurrentUser: () => {
      dispatch(getCurrentUser());
    },
    _setIdleStatus: status => {
      dispatch(_setIdleStatus(status));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  isIdle: makeSelectIdleState(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'app', reducer });
const withSaga = injectSaga({ key: 'app', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(App);
