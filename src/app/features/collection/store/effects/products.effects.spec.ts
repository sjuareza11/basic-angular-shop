import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { ProductApiService } from 'src/app/core/services/product-api.service';
import { mockProducts, MockProductsApiService } from './../../../../mocks/products.mock';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { loadProductDetailsRequest, loadProductDetailsSuccess, loadProductsByFiltersRequest, loadProductsByFiltersSuccess } from '../actions/products.actions';
import { initialState } from '../reducers/collection.reducer';
import { ProductsEffects } from './products.effects';

describe('ProductsEffects', () => {
  let actions$: Observable<any>;
  let effects: ProductsEffects;
  let productsApiService: ProductApiService;
  let store: MockStore

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductsEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
        { provide: ProductApiService, useClass: MockProductsApiService }
      ]
    });

    effects = TestBed.inject(ProductsEffects);
    store = TestBed.inject(MockStore);
    productsApiService = TestBed.inject(ProductApiService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
  describe('loadProductsByFiltersRequest$', () => {
    it('should fire if user apply filters', (done) => {
      const spy = spyOn(productsApiService, 'getProductsByFilters').and.callThrough();
      actions$ = of(loadProductsByFiltersRequest);
      effects.loadProductsByFiltersRequest$.subscribe((res) => {
        expect(res).toEqual(loadProductsByFiltersSuccess({ products: mockProducts }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });
  describe('loadProductDetailsRequest$', () => {
    it('should fire if user navigate to product details', (done) => {
      const spy = spyOn(productsApiService, 'getProduct').and.callThrough();
      actions$ = of(loadProductDetailsRequest);
      effects.loadProductDetailsRequest$.subscribe((res) => {
        expect(res).toEqual(loadProductDetailsSuccess({ product: mockProducts[0] }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });
});
