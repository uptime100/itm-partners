import React from 'react';
import PropTypes from 'prop-types';
import H1 from '../../components/H1';

import DefaultButton from '../../components/DefaultButton';

class AccountResetPassModal extends React.Component {
  render() {
    const modalOpen = this.props.isOpen;
    const modalClass = modalOpen === true ? 'modal is-active' : 'modal';

    return (
      <div>
        <div className={modalClass}>
          <div className="modal-background" />
          <div className="modal-content">
            <div
              className="has-text-centered"
              style={{ padding: '0px 30px 50px 30px' }}
            >
              <H1>Confirm Reset Password?</H1>
            </div>

            <div className="columns">
              <div className="column is-6 has-text-right">
                <DefaultButton
                  className="btn-submit"
                  onClick={this.props.onClickResetPassword}
                >
                  CONTINUE
                </DefaultButton>
              </div>
              <div className="column">
                <DefaultButton
                  className="btn-submit"
                  onClick={this.props.onClickCloseModal}
                >
                  Cancel
                </DefaultButton>
              </div>
            </div>
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={this.props.onClickCloseModal}
          />
        </div>
      </div>
    );
  }
}

AccountResetPassModal.propTypes = {
  isOpen: PropTypes.bool,
  onClickCloseModal: PropTypes.func,
  onClickResetPassword: PropTypes.func,
};

export default AccountResetPassModal;
