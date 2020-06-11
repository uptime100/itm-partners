/**
 *
 * Marketing
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import contentfulKeys from './contentful/keys';
import marked from 'marked';
import Loading from './Loading';
import makeSelectHelpPage from './selectors';
const contentful = require('contentful');

/* eslint-disable react/prefer-stateless-function */
export class HelpPage extends React.Component {
  state = {
    copy: '',
  };

  componentDidMount() {
    const { space, accessToken, contentId } = contentfulKeys;
    const client = contentful.createClient({
      space,
      accessToken,
    });
    client.getEntry(contentId).then(response => {
      const { copy } = response.fields;
      this.setState({ copy });
    });
  }

  render() {
    const { copy } = this.state;
    const markedCopy = marked(copy);

    if (!markedCopy) {
      return <Loading />;
    }

    return (
      <div className="container">
        <Helmet>
          <title>Help Page</title>
          <meta name="description" content="Description of Marketing" />
        </Helmet>
        <section>
          <div className="content has-text-justified">
            <div className="">
              <div
                className="helpPage"
                dangerouslySetInnerHTML={{ __html: markedCopy }}
              />
              <br />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  helpPage: makeSelectHelpPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'helpPage', reducer });
const withSaga = injectSaga({ key: 'helpPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HelpPage);
