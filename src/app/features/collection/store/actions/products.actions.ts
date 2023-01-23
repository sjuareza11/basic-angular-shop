import { createAction, props } from '@ngrx/store';
import { Product } from './../../../../core/models/product';
import { ProductQueryParams } from './../../models/product-query-params';

export const loadProductsByFiltersRequest = createAction(
  '[Products] Load Products By Filters Request', props<{ data: ProductQueryParams }>()
);

export const loadProductsByFiltersSuccess = createAction(
  '[Products] Load Products By Filters Success', props<{ products: Product[] }>()
);

export const loadProductDetailsRequest = createAction(
  '[Products] Load Product Detail Request', props<{ id: number }>()
);

export const loadProductDetailsSuccess = createAction(
  '[Products] Load Product Detail Success', props<{ product: Product }>()
);



