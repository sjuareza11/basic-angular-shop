import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoriesApiService } from './../../../../core/services/categories-api.service';
import { loadAllCategoriesRequest, loadAllCategoriesSuccess } from './../actions/categories.actions';

import { concatMap, map } from 'rxjs/operators';

@Injectable()
export class CategoriesEffects {


  loadAllCategoriessRequest$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadAllCategoriesRequest),
      concatMap((action) => this._categoriesApiService.getAllCategories()),
      map(response => loadAllCategoriesSuccess({ categories: response }))
    ));


  constructor(private _actions$: Actions, private _categoriesApiService: CategoriesApiService) { }
}

