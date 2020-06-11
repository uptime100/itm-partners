import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import partners from './partners.json';

const Partners = props => (
  <div className={props.className}>
    <h1 className="is-size-3 title"> Partners </h1>
    <div className="gallery">
      {partners.map(partner => (
        <figure key={partner.href}>
          <a href={partner.href} alt={partner.alt} target="_blank">
            <img src={partner.source} alt={partner.alt} />
          </a>
        </figure>
      ))}

      <div className="spacer" />
      <div className="spacer" />
      <div className="spacer" />
      <div className="spacer" />
      <div className="spacer" />
      <div className="spacer" />
      <div className="spacer" />
      <div className="spacer" />
    </div>
  </div>
);

Partners.propTypes = {
  className: PropTypes.string,
};

export default styled(Partners)`
  && {
    .title {
      color: #62b5e5;
      font-weight: bolder;
    }

    .gallery {
      display: flex;
      flex-wrap: wrap;
      margin-left: -9px;
      margin-right: -9px;
      margin-bottom: 50px;
      justify-content: space-between;

      figure {
        width: 128px;
        height: 128px;
        margin-left: 9px;
        margin-right: 9px;
        margin-bottom: 13px;
        background: white;
        padding: 16px;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        img {
          width: 100%;
          filter: grayscale(100%);
        }
      }

      .spacer {
        width: 128px;
        margin-left: 13px;
        margin-right: 13px;
      }
    }

    @media screen and (min-width: 1088px) {
      padding-top: 100px;

      .gallery {
        margin-left: -13px;
        margin-right: -13px;
      }

      figure {
        margin-left: 13px;
        margin-right: 13px;
      }
    }
  }
`;
