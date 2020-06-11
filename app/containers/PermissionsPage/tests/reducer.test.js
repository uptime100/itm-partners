import { fromJS } from 'immutable';
import permissionsPageReducer from '../reducer';

describe('permissionsPageReducer', () => {
  it('returns the initial state', () => {
    expect(permissionsPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
