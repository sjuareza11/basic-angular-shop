import * as fromCollection from '../reducers/collection.reducer';
import { selectCollectionState } from './products.selectors';

describe('Products Selectors', () => {
  it('should select the feature state', () => {
    const result = selectCollectionState({
      [fromCollection.collectionFeatureKey]: {}
    });

    expect(result).toEqual({} as fromCollection.State);
  });
});
