import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Icon = props => (
  <span className={`${props.className} icon`}>
    <i className={`fas fa-${props.name || 'info-circle'}`} />
  </span>
);

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
};

export default styled(Icon)`
  color: ${props => props.color || '#000'};
`;
