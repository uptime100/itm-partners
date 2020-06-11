import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.escFunction = this.escFunction.bind(this);
  }

  static defaultProps = {
    closeOnBackgroundClick: true,
    hasCloseButton: true,
  };

  escFunction(event) {
    if (event.keyCode === 27) {
      this.closeModal();
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false);
  }

  closeModal = () => {
    const { toggle = () => {}, disabled } = this.props;
    if (!disabled) {
      toggle(false);
    }
  };

  handleBackgroundClick = () => {
    if (this.props.closeOnBackgroundClick) {
      this.closeModal();
    }
  };

  render() {
    const { visible = false, hasCloseButton } = this.props;
    return (
      <div className={`modal ${visible ? 'is-active' : null}`}>
        <div
          className="modal-background"
          onClick={() => {
            this.handleBackgroundClick();
          }}
          role="presentation"
        />
        <div className="modal-content">{this.props.children}</div>
        {hasCloseButton && (
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={this.closeModal}
          />
        )}
      </div>
    );
  }
}

Modal.propTypes = {
  toggle: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  children: PropTypes.any,
  closeOnBackgroundClick: PropTypes.bool,
  hasCloseButton: PropTypes.bool,
};

export default Modal;
