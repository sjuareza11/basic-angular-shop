import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { productQueryParamsMock } from './../../../../mocks/router-params.mock';

import { productFilterMock } from 'src/app/mocks/filters.mock';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [ProductsService, provideMockStore({})]
    });
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should set product filters by url params', () => {

    service.setFiltersByParams(productQueryParamsMock)
    expect(service.filters).toEqual(productFilterMock)
  });

  it('should dispatch action to obtain products by filters', () => {
    const storeSpy = spyOn((service as any)._store, 'dispatch').and.callThrough();
    service.getProductsByFilters(productQueryParamsMock);
    expect(storeSpy).toHaveBeenCalledTimes(1);
  });

});
