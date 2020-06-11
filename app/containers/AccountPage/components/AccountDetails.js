import React, { Component } from 'react';
import H1 from '../../../components/H1';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import LabelInputText from '../components/LabelInputText';
import noLogo from '../../../images/No-Logo-256.png';

class AccountDetails extends Component {
  componentDidMount() {
    const Uppy = window.Uppy;
    const uppy = Uppy.Core({
      debug: true,
      autoProceed: false,
      restrictions: {
        maxFileSize: 300000,
        maxNumberOfFiles: 1,
        minNumberOfFiles: 1,
        allowedFileTypes: ['image/*', 'video/*'],
      },
    })
      .use(Uppy.Transloadit, {
        params: {
          auth: {
            // To avoid tampering use signatures:
            // https://transloadit.com/docs/api/#authentication
            key: '56845700e7c411e8bebc0104e43381c0',
          },
          template_id: '769eb940e7c411e8b2a2df8db356fc3d',
        },
        waitForEncoding: true,
      })
      .use(Uppy.Dashboard, {
        trigger: '#uppy-open-modal',
        target: 'body',
      })
      .use(Uppy.Url, {
        target: Uppy.Dashboard,
        serverUrl: 'https://api2.transloadit.com/companion',
        serverPattern: '.transloadit.com$',
      })
      .on('transloadit:result', (stepName, result) => {
        // use transloadit encoding result here.
        if (stepName === 'convert_image_jpg') {
          this.props.onChangeCompanyLogo(result.url);
          uppy.getPlugin('Dashboard').closeModal();
          toast.success('Image successfully uploaded');
        }
      });
  }

  render() {
    return (
      <div className="column">
        <div className="box">
          <form method="POST">
            <H1>Account Details</H1>

            <LabelInputText
              label="Company Screen Name"
              placeholder="Company Screen Name(Short for on-screen display)"
              value={this.props.form.name}
              onChange={this.props.updateName}
            />

            <LabelInputText
              label="Company Name"
              placeholder="Company Name (Full name for receipts etc)"
              value={this.props.form.nameFull}
              onChange={this.props.updateNameFull}
            />

            <LabelInputText
              label="Public Email Address"
              placeholder="Public Email Address"
              value={this.props.form.publicEmailAddress}
              onChange={this.props.updatePublicEmail}
              type="email"
            />

            <LabelInputText
              label="Website"
              placeholder="Website"
              value={this.props.form.website}
              onChange={this.props.updateWebsite}
              onBlur={this.props.onBlurWebsite}
            />

            <LabelInputText
              label="Description"
              placeholder="Description"
              value={this.props.form.description}
              onChange={this.props.updateDescription}
            />

            <div
              className="field"
              style={{ paddingTop: 32, paddingBottom: 32 }}
            >
              <input
                className="input"
                type="text"
                name="logo"
                placeholder="Large logo upload"
                value={this.props.form.logoLarge}
                type="hidden"
              />

              <div className="columns level">
                <div className="column is-one-half">
                  <div className="image-wrapper has-text-centered">
                    <img
                      src={this.props.form.logoLarge}
                      onError={e => {
                        e.target.onerror = null;
                        e.target.src = noLogo;
                      }}
                      alt="Company Logo"
                      width="150"
                    />
                  </div>
                </div>
                <div className="column is-one-half">
                  <button
                    className="button is-primary is-hovered"
                    type="button"
                    style={{ width: '100%' }}
                    id="uppy-open-modal"
                  >
                    <i className="fas fa-upload" /> UPLOAD LOGO
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

AccountDetails.propTypes = {
  form: PropTypes.object,
  updatePublicEmail: PropTypes.func,
  updateWebsite: PropTypes.func,
  updateDescription: PropTypes.func,
  updateName: PropTypes.func,
  updateNameFull: PropTypes.func,
  onChangeCompanyLogo: PropTypes.func,
  onBlurWebsite: PropTypes.func,
};

export default AccountDetails;
