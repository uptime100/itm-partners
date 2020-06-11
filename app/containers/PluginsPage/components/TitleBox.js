import React from 'react';
import H1 from '../../../components/H1';
import PropTypes from 'prop-types';

const TitleBox = props => (
  <div className="box">
    <H1>{props.title}</H1>

    {props.children}
  </div>
);

TitleBox.propTypes = {
  title: PropTypes.any,
  children: PropTypes.any,
};

export default TitleBox;
