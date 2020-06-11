import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import accountIcon from '../../images/icons/account.png';
import accountIconActive from '../../images/icons/account-active.png';
import dealsIcon from '../../images/icons/deals.png';
import dealsIconActive from '../../images/icons/deals-active.png';
import directoryIcon from '../../images/icons/directory.png';
import directoryIconActive from '../../images/icons/directory-active.png';
import marketingIcon from '../../images/icons/marketing.png';
import marketingIconActive from '../../images/icons/marketing-active.png';
import pluginIcon from '../../images/icons/plugin.png';
import pluginIconActive from '../../images/icons/plugin-active.png';
import reputationIcon from '../../images/icons/reputation.png';
import reputationIconActive from '../../images/icons/reputation-active.png';
import transactionsIcon from '../../images/icons/transactions.png';
import transactionsIconActive from '../../images/icons/transactions-active.png';
import helpIcon from '../../images/icons/help.png';
import helpIconActive from '../../images/icons/help-active.png';
import searchIcon from '../../images/icons/search.png';

const icons = {
  accountIcon,
  accountIconActive,
  dealsIcon,
  dealsIconActive,
  directoryIcon,
  directoryIconActive,
  marketingIcon,
  marketingIconActive,
  pluginIcon,
  pluginIconActive,
  reputationIcon,
  reputationIconActive,
  transactionsIcon,
  transactionsIconActive,
  helpIcon,
  helpIconActive,
  searchIcon,
};

const NavbarImageIcon = props => {
  const { isActive, name, page } = props;
  if (!name) {
    return null;
  }

  let image = icons[`${name}Icon`];

  if (window.screen.width > 1024) {
    if (isActive || page) {
      const activeName = `${name}IconActive`;
      if (icons[activeName]) {
        image = icons[activeName];
      } else {
        return null;
      }
    }
  }

  return (
    <div className={`${props.className}`}>
      <img src={image} alt={name} />
    </div>
  );
};

NavbarImageIcon.propTypes = {
  isActive: PropTypes.bool,
  name: PropTypes.string,
  className: PropTypes.string,
  page: PropTypes.bool,
};

export default styled(NavbarImageIcon)`
  width: 30px;
  height: 30px;
  margin-bottom: 4px;
  display: inline-block;
  margin-right: 12px;

  @media screen and (min-width: 1088px) {
    display: block;
    margin-right: 0;
  }
`;
