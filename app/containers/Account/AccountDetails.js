import React from 'react';
import H1 from '../../components/H1';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

class AccountDetails extends React.Component {
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
      <div className="box">
        <form method="POST" onSubmit={this.props.onEditAccount}>
          <div className="columns">
            <div className="column is-8-mobile mobileRes">
              <H1>Account Details</H1>
              {/* </div>
            <div className="column has-text-right is-4-mobile mobileRes">
              <div className="accountSave">
                <PrimaryButton>Save</PrimaryButton>
              </div> */}
            </div>
          </div>

          <div className="columns">
            <div className="column">
              <label htmlFor="companyScreenName">
                <strong>Company Screen Name </strong>
              </label>
              <input
                className="input"
                type="text"
                name="companyScreenName"
                placeholder="Company Screen Name(Short for on-screen display)"
                value={this.props.companyScreenName}
                onChange={this.props.onChangeCompanyScreenName}
              />
            </div>
          </div>

          <div className="columns">
            <div className="column">
              <label htmlFor="companyName">
                <strong>Company Name </strong>
              </label>
              <input
                className="input"
                type="text"
                name="companyName"
                placeholder="Company Name (Full name for receipts etc)"
                value={this.props.companyName}
                onChange={this.props.onChangeCompanyName}
              />
            </div>
          </div>

          <div className="columns">
            <div className="column">
              <label htmlFor="email">
                <strong>Public Email Address </strong>
              </label>
              <input
                className="input"
                type="text"
                name="email"
                placeholder="Public Email Address"
                value={this.props.email}
                onChange={this.props.onChangeEmail}
              />
            </div>
          </div>

          <div className="columns">
            <div className="column">
              {/* <div style={{marginBottom:'10px'}}>
                <label htmlFor="logo">
                  <strong>Large Logo Upload</strong>
                </label>
              </div> */}

              <div
                className="field has-addons level"
                style={{ display: 'flex', flexWrap: 'wrap' }}
              >
                <div className="control level-left" style={{ flex: '1 0 40%' }}>
                  <strong>Large Logo Upload</strong>
                </div>

                <div
                  className="control uploadInput level"
                  style={{ flex: '1 0 20%' }}
                >
                  <input
                    className="input"
                    type="text"
                    name="logo"
                    placeholder="Large logo upload"
                    value={this.props.logo}
                    type="hidden"
                  />
                  <div
                    style={{ position: 'relative', top: '12px', right: '10px' }}
                  >
                    <figure className="image">
                      <img src={this.props.logo} alt="Company Logo" />
                    </figure>
                  </div>
                </div>
                <div
                  className="control uploadButton level-right"
                  style={{ flex: '1 0 40%' }}
                >
                  <button
                    type="button"
                    style={{ width: '80%' }}
                    id="uppy-open-modal"
                  >
                    <i className="fas fa-upload" /> UPLOAD LOGO
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="columns">
            <div className="column">
              <label htmlFor="website">
                <strong>Website</strong>
              </label>
              <input
                className="input"
                type="text"
                name="website"
                placeholder="Website"
                value={this.props.website}
                onChange={this.props.onChangeWebsite}
              />
            </div>
          </div>

          <div className="columns">
            <div className="column">
              <label htmlFor="description">
                <strong>Description</strong>
              </label>
              <input
                className="input"
                type="text"
                name="description"
                placeholder="Description"
                value={this.props.description}
                onChange={this.props.onChangeDescription}
              />
            </div>
          </div>
          {/*           
          <div className="columns">
            <div className="column has-text-right buttonAlign">
              <DefaultButton>ADD PHYSICAL LOCATION</DefaultButton>
            </div>
          </div>

          <H3>Locations:</H3>
          <div className="columns">
            <div className="column is-10 is-12-mobile mobileRes physicalAdd">
              <ol>
                <li>
                  {' '}
                  23 Elizabeth Street, Melbourne, AU 3000 M: 9am-11:30pm,
                  9am-11:30pm, W: 9am-11:30pm, Ph 1300 134 123
                </li>
              </ol>
            </div>

            <div className="column is-2 is-12-mobile mobileRes has-text-centered has-text-right-mobile">
              <div className="editButton">
                <PrimaryButton>
                  <i className="far fa-edit" />
                </PrimaryButton>
              </div>
            </div>
          </div> */}
        </form>
      </div>
    );
  }
}

AccountDetails.propTypes = {
  companyName: PropTypes.string,
  companyScreenName: PropTypes.string,
  email: PropTypes.string,
  website: PropTypes.string,
  logo: PropTypes.string,
  description: PropTypes.string,
  onChangeCompanyName: PropTypes.func,
  onChangeCompanyScreenName: PropTypes.func,
  onChangeEmail: PropTypes.func,
  onChangeWebsite: PropTypes.func,
  onChangeDescription: PropTypes.func,
  onEditAccount: PropTypes.func,
  onChangeCompanyLogo: PropTypes.func,
};

export default AccountDetails;
