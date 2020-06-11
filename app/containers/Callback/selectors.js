/**
 * Callback selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectTokenDetails = state => state.get('tokenDetails', initialState);

const makeSelectTokenDetails = () =>
  createSelector(selectTokenDetails, tokenDetailState =>
    tokenDetailState.get('tokenDetails'),
  );

export { selectTokenDetails, makeSelectTokenDetails };
