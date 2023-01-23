import { createReducer, on } from '@ngrx/store';
import { Product } from '../../../../core/models/product';
import * as CategoriesActions from '../actions/categories.actions';
import * as ProductsActions from '../actions/products.actions';

import { Category } from './../../../../core/models/category';

export const collectionFeatureKey = 'collection';

export interface State {
  products: Product[],
  categories: Category[],
  currentProductActive: Product
}

export const initialState: State = {
  products: [],
  categories: [],
  currentProductActive: {} as Product
};

export const collectionFeatureReducer = createReducer(
  initialState,

  on(ProductsActions.loadProductsByFiltersSuccess, (state, action) => ({
    ...state,
    products: [...action.products],
  })),
  on(CategoriesActions.loadAllCategoriesSuccess, (state, action) => ({
    ...state,
    categories: action.categories,
  })),
  on(ProductsActions.loadProductDetailsSuccess, (state, action) => ({
    ...state,
    currentProductActive: action.product,
  })),

);
