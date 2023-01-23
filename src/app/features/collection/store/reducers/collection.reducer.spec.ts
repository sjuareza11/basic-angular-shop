import * as CategoriesActions from '../actions/categories.actions';
import * as ProductsActions from '../actions/products.actions';
import { mockCategories } from './../../../../mocks/categories.mock';
import { collectionFeatureReducer, initialState } from './collection.reducer';

import { mockProducts } from 'src/app/mocks/products.mock';
describe('collectionFeatureReducer', () => {
  it('should handle loadProductsByFiltersSuccess', () => {
    const action = ProductsActions.loadProductsByFiltersSuccess({ products: mockProducts });
    const state = collectionFeatureReducer(initialState, action);
    expect(state.products).toEqual(mockProducts);
  });

  it('should handle loadAllCategoriesSuccess', () => {
    const action = CategoriesActions.loadAllCategoriesSuccess({ categories: mockCategories });
    const state = collectionFeatureReducer(initialState, action);
    expect(state.categories).toEqual(mockCategories);
  });

  it('should handle loadProductDetailsSuccess', () => {
    const action = ProductsActions.loadProductDetailsSuccess({ product: mockProducts[0] });
    const state = collectionFeatureReducer(initialState, action);
    expect(state.currentProductActive).toEqual(mockProducts[0]);
  });
});
