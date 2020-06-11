import { fromJS } from 'immutable';
import marketingReducer from '../reducer';

describe('marketingReducer', () => {
  it('returns the initial state', () => {
    expect(marketingReducer(undefined, {})).toEqual(fromJS({}));
  });
});
