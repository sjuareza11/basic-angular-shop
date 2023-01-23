import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { ProductQueryParams } from '../../models/product-query-params';
import { loadProductsByFiltersRequest } from '../../store/actions/products.actions';
import { State } from '../../store/reducers/collection.reducer';
import { ProductFilterBarAdapter } from './../../adapters/product-filter-bar.adapter';
import { ProductFilterBar } from './../../models/product-filter-bar';


@Injectable()
export class ProductsService implements OnDestroy {
  public filters: ProductFilterBar | undefined;
  private _ngUnsubscribe$: Subject<void> = new Subject<void>();

  constructor(private _activatedRouter: ActivatedRoute, private _store: Store<State>) { }

  public listenerRouterQueryParams(): void {
    this._activatedRouter.queryParams.pipe(
      takeUntil(this._ngUnsubscribe$),
    ).subscribe((params) => {
      this.setFiltersByParams(params)
      this.getProductsByFilters(params);
    })
  }

  public setFiltersByParams(params: Params): void {
    const produtFilterBarAdapter = new ProductFilterBarAdapter()
    this.filters = produtFilterBarAdapter.adapt(params as ProductQueryParams);
  }

  public getProductsByFilters(params: Params): void {
    this._store.dispatch(loadProductsByFiltersRequest({ data: params as ProductQueryParams }));
  }

  public ngOnDestroy(): void {
    this._ngUnsubscribe$.next();
    this._ngUnsubscribe$.complete();
  }
}
