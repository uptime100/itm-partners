/*
 *
 * PluginsPage actions
 *
 */

import {
  DEFAULT_ACTION,
  CHANGE_INTIMATE_API_CLIENT_ID,
  CHANGE_INTIMATE_API_CLIENT_SECRET_ID,
  RESET_INTIMATE_API_ID,
  CHANGE_WOOCOMMERCE_API_CLIENT_ID,
  CHANGE_WOOCOMMERCE_API_CLIENT_SECRET_ID,
  RESET_WOOCOMMERCE_API_ID,
  RESET_INTIMATE_API_ID_SUCCESS,
  RESET_WOOCOMMERCE_API_ID_SUCCESS,
  FETCH_CURRENT_USER,
  SAVE_WALLET_ADDRESS,
  RESET_API_KEY,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function changeIntimateClientID(payload) {
  return {
    type: CHANGE_INTIMATE_API_CLIENT_ID,
    payload,
  };
}

export function changeIntimateClientSecretID(payload) {
  return {
    type: CHANGE_INTIMATE_API_CLIENT_SECRET_ID,
    payload,
  };
}

export function resetIntimateAPIID(payload) {
  return {
    type: RESET_INTIMATE_API_ID,
    payload,
  };
}

export function resetIntimateAPIIDSuccess(payload) {
  return {
    type: RESET_INTIMATE_API_ID_SUCCESS,
    payload,
  };
}

export function changeWoocommerceClientID(payload) {
  return {
    type: CHANGE_WOOCOMMERCE_API_CLIENT_ID,
    payload,
  };
}

export function changeWoocommerceClientSecretID(payload) {
  return {
    type: CHANGE_WOOCOMMERCE_API_CLIENT_SECRET_ID,
    payload,
  };
}

export function resetWoocommerceAPIID(payload) {
  return {
    type: RESET_WOOCOMMERCE_API_ID,
    payload,
  };
}

export function resetWoocommerceAPIIDSuccess(payload) {
  return {
    type: RESET_WOOCOMMERCE_API_ID_SUCCESS,
    payload,
  };
}

export function fetchCurrentUser() {
  return {
    type: FETCH_CURRENT_USER,
  };
}

export function saveWalletAddress(client, walletAddresses) {
  return {
    type: SAVE_WALLET_ADDRESS,
    payload: {
      client,
      walletAddresses,
    },
  };
}

export function onSubmitResetApiKey(id) {
  return {
    type: RESET_API_KEY,
    payload: id,
  };
}
