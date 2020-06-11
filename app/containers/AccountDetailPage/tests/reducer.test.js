import { fromJS } from 'immutable';
import accountDetailPageReducer from '../reducer';

describe('accountDetailPageReducer', () => {
  it('returns the initial state', () => {
    expect(accountDetailPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
