/**
 *
 * PrimaryButton
 *
 */

import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class PrimaryButton extends React.Component {
  render() {
    const Btn = styled.button`
      background: #365e9d !important;
    `;

    return (
      <Btn className="button is-primary" onClick={this.props.onClick}>
        {Children.toArray(this.props.children)}
      </Btn>
    );
  }
}

PrimaryButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default PrimaryButton;
