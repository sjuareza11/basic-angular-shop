import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadProductDetailsRequest, loadProductDetailsSuccess } from './../actions/products.actions';

import { forkJoin, of } from 'rxjs';
import { concatMap, map, mergeMap } from 'rxjs/operators';
import { INCORRECT_PRODUCT_PRICE_CATEGORY_ID } from 'src/app/core/constants/categories';
import { ProductApiService } from 'src/app/core/services/product-api.service';
import { loadProductsByFiltersRequest, loadProductsByFiltersSuccess } from '../actions/products.actions';

@Injectable()
export class ProductsEffects {

  loadProductsByFiltersRequest$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadProductsByFiltersRequest),
      concatMap((action) => this._productApiService.getProductsByFilters(action.data).pipe(
        mergeMap(products => products.length ? forkJoin(
          products.map(product => product.category.id === INCORRECT_PRODUCT_PRICE_CATEGORY_ID ? this._productApiService.getProduct(product.id) : of(product))) : of(products))
      )),
      map(response => loadProductsByFiltersSuccess({ products: response }))
    ));

  loadProductDetailsRequest$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadProductDetailsRequest),
      concatMap((action) => this._productApiService.getProduct(action.id)),
      map(response => loadProductDetailsSuccess({ product: response }))
    ));

  constructor(private _actions$: Actions, private _productApiService: ProductApiService) { }
}

