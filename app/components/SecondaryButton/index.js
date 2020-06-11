/**
 *
 * SecondaryButton
 *
 */

import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class SecondaryButton extends React.Component {
  render() {
    const Btn = styled.button`
      background-color: white !important;
      color: #62b5e5 !important;
      border: 2px solid #62b5e5 !important;
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

SecondaryButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default SecondaryButton;
