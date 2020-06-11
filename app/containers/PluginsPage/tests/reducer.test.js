import { fromJS } from 'immutable';
import pluginsPageReducer from '../reducer';

describe('pluginsPageReducer', () => {
  it('returns the initial state', () => {
    expect(pluginsPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
