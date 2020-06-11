import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import woocommerce from '../../../images/woocommerce-80.png';
import magento from '../../../images/magento-80.png';
import shopify from '../../../images/shopify-80.png';
import nats from '../../../images/nats-80.png';

const PLUGINS = {
  woocommerce,
  magento,
  shopify,
  nats,
};

class TablePartnersRow extends React.Component {
  render() {
    const { isToggle, id } = this.props;

    const { partner, openSuspendPartnerModal, handleToggle } = this.props;

    const toggleClassname =
      isToggle && partner._id === id ? 'dropdown is-active' : 'dropdown';

    return (
      <tr>
        <td style={{ wordBreak: 'break-word' }}>{partner.name}</td>
        <td className="directoryMobile">
          {_.orderBy(_.uniq(partner.categories)).join(', ')}
        </td>
        <td className="directoryMobile">
          <div style={{ display: 'flex' }}>
            {_.orderBy(_.uniq(partner.plugins)).map((plugin, key) => (
              <img
                src={PLUGINS[plugin]}
                key={key}
                alt={plugin}
                style={{ width: '30px', height: '30px ' }}
              />
            ))}
          </div>
        </td>

        {/* <td>0</td> */}

        <td className="directoryMobile">{partner.primaryCountry}</td>
        <td style={{ textAlign: 'center' }}>
          {partner.isActive ? (
            <span className="tag is-primary">Active</span>
          ) : (
            <span className="tag is-danger">Suspended</span>
          )}
        </td>
        {/* <td /> */}
        <td className="has-text-centered-mobile">
          <div className={toggleClassname}>
            <div className="dropdown-trigger">
              <button
                onClick={() => handleToggle(partner._id)}
                className="button"
                aria-haspopup="true"
                aria-controls="dropdown-menu"
              >
                <span>Action</span>
                <span className="icon is-small">
                  <i className="fas fa-angle-down" aria-hidden="true" />
                </span>
              </button>
            </div>
            <div
              className="dropdown-menu"
              id="dropdown-menu"
              role="menu"
              style={{ zIndex: 99 }}
            >
              <div className="dropdown-content dropdown-width">
                {partner.isActive ? (
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      openSuspendPartnerModal(partner, 'suspend');
                    }}
                  >
                    Suspend
                  </button>
                ) : (
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      openSuspendPartnerModal(partner, 'activate');
                    }}
                  >
                    Activate
                  </button>
                )}
                <Link
                  className="dropdown-item"
                  to={`/account/${partner._id}`}
                  href={`/account/${partner._id}`}
                >
                  Manage
                </Link>
                {/* <button
                  className="dropdown-item"
                  onClick={() => { console.log(me.partner._id) }}
                >
                  Reset Password
                </button> */}
              </div>
            </div>
          </div>
        </td>
      </tr>
    );
  }
}

TablePartnersRow.propTypes = {
  partner: PropTypes.any,
  openSuspendPartnerModal: PropTypes.any,
  isToggle: PropTypes.bool,
  id: PropTypes.string,
  handleToggle: PropTypes.func,
};

export default TablePartnersRow;
