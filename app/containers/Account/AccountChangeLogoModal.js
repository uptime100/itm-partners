import React from 'react';
import PropTypes from 'prop-types';

class AccountChangeLogoModal extends React.Component {
  render() {
    const modalOpenLogo = this.props.isOpenLogo;
    const modalClassLogo = modalOpenLogo === true ? 'modal is-active' : 'modal';

    return (
      <div>
        <div className={modalClassLogo}>
          <div className="modal-background" />
          <div className="modal-content">
            <button>Upload image here</button>
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={this.props.onClickCloseLogoModal}
          />
        </div>
      </div>
    );
  }
}

AccountChangeLogoModal.propTypes = {
  isOpenLogo: PropTypes.bool,
  onClickCloseLogoModal: PropTypes.func,
};

export default AccountChangeLogoModal;
