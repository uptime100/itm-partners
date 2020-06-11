import React from 'react';
import PropTypes from 'prop-types';

const Disclaimer = props => {
  const { isDisclaimerModalActive, closeDisclaimerModal } = props;

  const modalClass = isDisclaimerModalActive ? 'modal is-active' : 'modal';

  return (
    <div id="disclaimer" className={modalClass}>
      <div className="modal-background" />
      <div
        className="modal-content has-text-justified disclaimerModalContent"
        style={{ padding: '0px' }}
      >
        <div className="content" style={{ padding: '2.25rem' }}>
          <div className="has-text-centered">
            <h1 className="title is-4">Disclaimer</h1>
          </div>

          <br />

          <p>
            The intimate cryptocurrency website is directed only at persons who:
          </p>
          <p>
            a) Are considering implementing intimate as a digital payment option
            for an adult (or sexual) product, service or offering; or
          </p>
          <p>
            b) Are expert investors who fall within any definition provided by
            their local jurisdiction or are otherwise permitted to view this
            website in compliance with the governing laws of their respective
            jurisdiction
          </p>
          <p>
            If you are a resident of the United States of America,the
            People&apos;s Republic of China or any other region that has rulings
            preventing cryptocurrency token sales, you must not agree.
          </p>
          <p>
            By agreeing to access this website you accept the statement of
            disclosure above and undertake to provide true and accurate
            information upon request.
          </p>
          <br />
          <div className="has-text-centered">
            <button
              onClick={closeDisclaimerModal}
              className="button is-primary modal-button"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={closeDisclaimerModal}
        className="modal-close is-large"
        aria-label="close"
      />
    </div>
  );
};

Disclaimer.propTypes = {
  isDisclaimerModalActive: PropTypes.bool,
  closeDisclaimerModal: PropTypes.func,
};

export default Disclaimer;
