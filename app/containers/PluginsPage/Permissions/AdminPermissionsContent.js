import React from 'react';

class AdminPermissionsContent extends React.Component {
  render() {
    const viewPermissions = [
      { value: 'superAdmin', label: 'Super Admin' },
      { value: 'customerSupport', label: 'Customer Support' },
      { value: 'partner', label: 'Partner' },
      { value: 'partnerTech', label: 'Partner Tech' },
      { value: 'partnerMarketing', label: 'Partner Marketing' },
      { value: 'partnerFinance', label: 'Partner Finance' },
    ];

    const exportPermissions = [
      { value: 'superAdmin', label: 'Super Admin' },
      { value: 'customerSupport', label: 'Customer Support' },
      { value: 'partner', label: 'Partner' },
      { value: 'partnerTech', label: 'Partner Tech' },
      { value: 'partnerMarketing', label: 'Partner Marketing' },
      { value: 'partnerFinance', label: 'Partner Finance' },
    ];

    const reputationSignPermissions = [
      { value: 'superAdmin', label: 'Super Admin' },
      { value: 'customerSupport', label: 'Customer Support' },
      { value: 'partner', label: 'Partner' },
      { value: 'partnerTech', label: 'Partner Tech' },
      { value: 'partnerMarketing', label: 'Partner Marketing' },
      { value: 'partnerFinance', label: 'Partner Finance' },
    ];

    const reputationEditPermissions = [
      { value: 'superAdmin', label: 'Super Admin' },
      { value: 'customerSupport', label: 'Customer Support' },
      { value: 'partner', label: 'Partner' },
      { value: 'partnerTech', label: 'Partner Tech' },
      { value: 'partnerMarketing', label: 'Partner Marketing' },
      { value: 'partnerFinance', label: 'Partner Finance' },
    ];

    const viewPermissionsCheckbox = viewPermissions.map(permission => (
      <div className="column">
        <input type="checkbox" className="checkbox" value={permission.value} />
      </div>
    ));

    const exportPermissionsCheckbox = exportPermissions.map(permission => (
      <div className="column">
        <input type="checkbox" className="checkbox" value={permission.value} />
      </div>
    ));

    const reputationSignPermissionsCheckbox = reputationSignPermissions.map(
      permission => (
        <div className="column">
          <input
            type="checkbox"
            className="checkbox"
            value={permission.value}
          />
        </div>
      ),
    );

    const reputationEditPermissionsCheckbox = reputationEditPermissions.map(
      permission => (
        <div className="column">
          <input
            type="checkbox"
            className="checkbox"
            value={permission.value}
          />
        </div>
      ),
    );

    return (
      <div>
        <div className="columns">
          <div className="column is-8 is-offset-2">
            <div className="columns">
              <div className="column">
                <strong>Super Admin</strong>
              </div>
              <div className="column">
                <strong>Customer Support</strong>
              </div>
              <div className="column">
                <strong>Partner</strong>
              </div>
              <div className="column">
                <strong>Partner Tech</strong>
              </div>
              <div className="column">
                <strong>Partner Marketing</strong>
              </div>
              <div className="column">
                <strong>Partner Finance</strong>
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <strong>Transactions</strong>
          </div>
        </div>
        <div className="columns">
          <div className="column is-2">View</div>
          <div className="column is-8">
            <div className="columns">{viewPermissionsCheckbox}</div>
          </div>
          <div className="column is-2">Check/Uncheck All</div>
        </div>
        <div className="columns">
          <div className="column is-2">Export</div>
          <div className="column is-8">
            <div className="columns">{exportPermissionsCheckbox}</div>
          </div>
          <div className="column is-2">Check/Uncheck All</div>
        </div>

        <div className="columns">
          <div className="column">
            <strong>Reputation</strong>
          </div>
        </div>
        <div className="columns">
          <div className="column is-2">Sign</div>
          <div className="column is-8">
            <div className="columns">{reputationSignPermissionsCheckbox}</div>
          </div>
          <div className="column is-2">Check/Uncheck All</div>
        </div>
        <div className="columns">
          <div className="column is-2">Edit</div>
          <div className="column is-8">
            <div className="columns">{reputationEditPermissionsCheckbox}</div>
          </div>
          <div className="column is-2">Check/Uncheck All</div>
        </div>
      </div>
    );
  }
}

export default AdminPermissionsContent;
