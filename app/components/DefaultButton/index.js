/**
 *
 * PrimaryButton
 *
 */

import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class DefaultButton extends React.Component {
  render() {
    const Btn = styled.button`
      background-color: #365e9d !important;
      color: white !important;
      width: 100%;
      text-transform: uppercase;
    `;

    return (
      <Btn className="button" onClick={this.props.onClick}>
        {Children.toArray(this.props.children)}
      </Btn>
    );
  }
}

DefaultButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default DefaultButton;
