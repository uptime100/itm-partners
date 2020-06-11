import React from 'react';
import PropTypes from 'prop-types';

const PageWrapper = props => (
  <section className="section" style={{ marginBottom: 52 }}>
    <div className="container">{props.children}</div>
  </section>
);

PageWrapper.propTypes = {
  children: PropTypes.any,
};

export default PageWrapper;
