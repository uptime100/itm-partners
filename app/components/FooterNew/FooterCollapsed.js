import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const FooterCollapsed = props => (
  <div
    className={`${props.className} navbar-footer-collapsed is-hidden-desktop`}
  >
    <div className="container">
      <a href="https://intimate.io" className="link">
        &copy; intimate.io
      </a>
      <a href="/" className="link">
        Disclaimer
      </a>
      <a
        href="https://intimate.io/privacy-policy"
        target="_blank"
        className="link"
      >
        Privacy Policy
      </a>
      <a
        href="https://intimate.io/terms-of-use"
        target="_blank"
        className="link"
      >
        Terms of Use
      </a>
      <a
        href="https://intimate.io/cookie-policy"
        target="_blank"
        className="link"
      >
        Cookie Policy
      </a>
      <a href="mailto:support@intimate.io" className="link">
        Contact Us
      </a>
    </div>
  </div>
);

FooterCollapsed.propTypes = {
  className: PropTypes.string,
};

export default styled(FooterCollapsed)`
  && {
    background: #365e9d;

    .container {
      padding: 8px 12px;
    }

    .link {
      color: #fff;
      display: inline-block;
      margin-right: 4px;
    }

    .link::after {
      content: '|';
      margin-left: 4px;
      color: #fff;
    }

    .link:last-child::after {
      content: none;
    }

    .link:hover {
      color: #62b5e5;
    }
  }
`;
