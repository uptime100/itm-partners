import { fromJS } from 'immutable';
import directoryPageReducer from '../reducer';

describe('directoryPageReducer', () => {
  it('returns the initial state', () => {
    expect(directoryPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
