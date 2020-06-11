import { SET_TOKEN } from './constants';

export function setTokenDetails(tokenDetails) {
  return {
    type: SET_TOKEN,
    payload: tokenDetails,
  };
}
