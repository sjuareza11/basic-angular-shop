import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCollection from '../reducers/collection.reducer';

export const selectCollectionState = createFeatureSelector<fromCollection.State>(
  fromCollection.collectionFeatureKey
);
export const selectProducts = createSelector(
  selectCollectionState,
  (state: fromCollection.State) => state.products
);
export const selectCurrentProductActive = createSelector(
  selectCollectionState,
  (state: fromCollection.State) => state.currentProductActive
);
export const selectCategories = createSelector(
  selectCollectionState,
  (state: fromCollection.State) => state.categories
);

