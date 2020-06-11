import React from 'react';
import PropTypes from 'prop-types';
// import PrimaryButton from '../../components/PrimaryButton';
import H1 from '../../components/H1';
import PrimaryButton from '../../components/PrimaryButton';

class SuspendModal extends React.Component {
  render() {
    const modalOpen = this.props.isSuspendOpen;
    const modalClass = modalOpen === true ? 'modal is-active' : 'modal';
    return (
      <div>
        <div className={modalClass}>
          <div className="modal-background" />
          <div className="modal-content">
            <div className="headingMargin has-text-centered">
              <H1>Suspend Account</H1>
            </div>
            <div className="has-text-centered">
              <p> Are you sure you want to suspend this account?</p>
            </div>

            <div style={{ paddingTop: '40px' }}>
              <div className="columns">
                <div className="column has-text-right">
                  <form>
                    <PrimaryButton onClick={this.props.onClickSuspendCompany}>
                      CONFIRM
                    </PrimaryButton>
                  </form>
                </div>
                <div className="column">
                  <PrimaryButton onClick={this.props.onClickCloseSuspendModal}>
                    CANCEL
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={this.props.onClickCloseSuspendModal}
        />
      </div>
    );
  }
}

SuspendModal.propTypes = {
  isSuspendOpen: PropTypes.bool,
  onClickCloseSuspendModal: PropTypes.func,
  onClickSuspendCompany: PropTypes.func,
};

export default SuspendModal;
