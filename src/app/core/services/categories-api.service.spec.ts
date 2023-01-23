import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CategoryApiPath } from '../enums/category-api-path';
import { mockCategories } from './../../mocks/categories.mock';

import { CategoriesApiService } from './categories-api.service';

describe('CategoriesApiService', () => {
  let service: CategoriesApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoriesApiService],
    });
    service = TestBed.inject(CategoriesApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all categories', () => {
    const spy = spyOn(service, 'getAllCategories').and.callThrough();
    service.getAllCategories().subscribe((data) => {
      expect(data).toEqual(mockCategories);
    });

    const req = httpMock.expectOne(`${(service as any)._apiUrl}${CategoryApiPath.GET_ALL_CATEGORIES}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCategories);
    expect(spy).toHaveBeenCalled();
    httpMock.verify();
  });




});
