import { createAction, props } from '@ngrx/store';
import { Category } from '../../../../core/models/category';

export const loadAllCategoriesRequest = createAction(
  '[Categories] Load All Categories Request');

export const loadAllCategoriesSuccess = createAction(
  '[[Categories] Load All Categories Success', props<{ categories: Category[] }>()
);





