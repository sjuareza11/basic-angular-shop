import { TestBed } from '@angular/core/testing';
import { ProductQueryParams } from 'src/app/features/collection/models/product-query-params';
import { mockProducts } from 'src/app/mocks/products.mock';
import { ProductApiPath } from '../enums/product-api-path';
import { Product } from '../models/product';
import { RequestUtils } from '../utils/request.utils';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductApiService } from './product-api.service';

describe('ProductApiService', () => {
  let service: ProductApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductApiService],
    });
    service = TestBed.inject(ProductApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get products by filters', () => {
    const filters: ProductQueryParams = { title: 'Generic' } as ProductQueryParams;
    const products: Product[] = mockProducts;
    const spy = spyOn(service, 'getProductsByFilters').and.callThrough();
    service.getProductsByFilters(filters).subscribe((data) => {
      expect(data).toEqual(products);
    });
    const req = httpMock.expectOne(`${(service as any)._apiUrl}${ProductApiPath.GET_PRODUCTS}${RequestUtils.convertObjectToQueryParams(filters)}`);
    expect(req.request.method).toBe('GET');
    req.flush(products);
    expect(spy).toHaveBeenCalledWith(filters);
    httpMock.verify();
  });

  it('should get product by id', () => {
    const id = 1;
    const product: Product = mockProducts[0];
    const spy = spyOn(service, 'getProduct').and.callThrough();
    service.getProduct(id).subscribe((data) => {
      expect(data).toEqual(product);
    });

    const req = httpMock.expectOne(`${(service as any)._apiUrl}${ProductApiPath.GET_PRODUCTS}${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(product);
    expect(spy).toHaveBeenCalledWith(id);
    httpMock.verify();
  });
});
