import { fromJS } from 'immutable';
import companiesPageReducer from '../reducer';

describe('companiesPageReducer', () => {
  it('returns the initial state', () => {
    expect(companiesPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
