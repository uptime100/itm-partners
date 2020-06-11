/*
 *
 * Account reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_COMPANY_NAME,
  CHANGE_COMPANY_SCREEN_NAME,
  CHANGE_EMAIL,
  CHANGE_COMPANY_WEBSITE,
  CHANGE_COMPANY_DESCRIPTION,
  CHANGE_COMPANY_LOGO,
  OPEN_MODAL,
  CLOSE_MODAL,
  OPEN_LOGO_MODAL,
  CLOSE_LOGO_MODAL,
  LOAD_COMPANY_DETAILS_SUCCESS,
  LOAD_COMPANY_DETAILS,
  CHANGE_CATEGORIES,
  CATEGORY_TO_CHECK,
  CATEGORY_TO_UNCHECK,
  CHANGE_PLUGINS,
  PLUGINS_TO_CHECK,
  PLUGINS_TO_UNCHECK,
  CHANGE_TARGET_AUDIENCE,
  TARGET_AUDIENCE_TO_CHECK,
  TARGET_AUDIENCE_TO_UNCHECK,
  CHANGE_ACCOUNT_EMAIL,
  CHANGE_LOCAL_TIMEZONE,
  CHANGE_LOCAL_CURRENCY,
  CHANGE_PRIMARY_COUNTRY,
  CURRENCIES_TO_CHECK,
  CURRENCIES_TO_UNCHECK,
  CHANGE_CURRENCIES_AVAILABLE,
} from './constants';

export const initialState = fromJS({
  isOpen: false,
  isOpenLogo: false,
  companyName: '',
  companyScreenName: '',
  email: '',
  website: '',
  description: '',
  logo: '',
  companyId: '',
  companyDetails: '',
  accountEmail: '',
});

function accountReducer(state = initialState, action) {
  let categories;
  let plugins;
  let targetAudiences;
  let currencies;

  switch (action.type) {
    case CHANGE_COMPANY_NAME:
      return state.set('companyName', action.payload);
    case CHANGE_COMPANY_SCREEN_NAME:
      return state.set('companyScreenName', action.payload);
    case CHANGE_EMAIL:
      return state.set('email', action.payload);
    case CHANGE_COMPANY_WEBSITE:
      return state.set('website', action.payload);
    case CHANGE_COMPANY_DESCRIPTION:
      return state.set('description', action.payload);
    case CHANGE_COMPANY_LOGO:
      return state.set('logo', action.payload);
    case CHANGE_CATEGORIES:
      return state.set('categories', action.payload);
    case OPEN_MODAL:
      return state.set('isOpen', true);
    case CLOSE_MODAL:
      return state.set('isOpen', false);
    case OPEN_LOGO_MODAL:
      return state.set('isOpenLogo', true);
    case CLOSE_LOGO_MODAL:
      return state.set('isOpenLogo', false);
    case LOAD_COMPANY_DETAILS:
      return state.set('companyId', action.payload);
    case LOAD_COMPANY_DETAILS_SUCCESS:
      return state.set('companyDetails', action.payload);
    case CHANGE_ACCOUNT_EMAIL:
      return state.set('accountEmail', action.payload);
    case CATEGORY_TO_CHECK:
      categories = state.get('categories').slice();
      categories.push(action.payload);
      return state.set('categories', categories);
    case CATEGORY_TO_UNCHECK:
      categories = state.get('categories').slice();
      categories = categories.filter(category => category !== action.payload);
      return state.set('categories', categories);

    case CHANGE_PLUGINS:
      return state.set('plugins', action.payload);
    case PLUGINS_TO_CHECK:
      plugins = state.get('plugins').slice();
      plugins.push(action.payload);
      return state.set('plugins', plugins);
    case PLUGINS_TO_UNCHECK:
      plugins = state.get('plugins').slice();
      plugins = plugins.filter(plugin => plugin !== action.payload);
      return state.set('plugins', plugins);

    case CHANGE_LOCAL_TIMEZONE:
      return state.set('localTimezone', action.payload);

    case CHANGE_LOCAL_CURRENCY:
      return state.set('localCurrency', action.payload);

    case CHANGE_PRIMARY_COUNTRY:
      return state.set('primaryCountry', action.payload);

    case CHANGE_TARGET_AUDIENCE:
      return state.set('targetAudiences', action.payload);
    case TARGET_AUDIENCE_TO_CHECK:
      targetAudiences = state.get('targetAudiences').slice();
      targetAudiences.push(action.payload);
      return state.set('targetAudiences', targetAudiences);
    case TARGET_AUDIENCE_TO_UNCHECK:
      targetAudiences = state.get('targetAudiences').slice();
      targetAudiences = targetAudiences.filter(
        targetAudience => targetAudience !== action.payload,
      );
      return state.set('targetAudiences', targetAudiences);

    case CHANGE_CURRENCIES_AVAILABLE:
      return state.set('currencies', action.payload);
    case CURRENCIES_TO_CHECK:
      currencies = state.get('currencies').slice();
      currencies.push(action.payload);
      return state.set('currencies', currencies);
    case CURRENCIES_TO_UNCHECK:
      currencies = state.get('currencies').slice();
      currencies = currencies.filter(currency => currency !== action.payload);
      return state.set('currencies', currencies);

    default:
      return state;
  }
}

export default accountReducer;
