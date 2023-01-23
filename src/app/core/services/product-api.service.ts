import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductApiPath } from '../enums/product-api-path';
import { Product } from '../models/product';
import { ProductQueryParams } from './../../features/collection/models/product-query-params';
import { RequestUtils } from './../utils/request.utils';

@Injectable()
export class ProductApiService {
  private readonly _apiUrl = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  public getProductsByFilters(filters: ProductQueryParams): Observable<Product[]> {
    const request = `${this._apiUrl}${ProductApiPath.GET_PRODUCTS}${RequestUtils.convertObjectToQueryParams(filters)}`
    return this._http.get<Product[]>(request);

  }

  public getProduct(id: number): Observable<Product> {
    const request = `${this._apiUrl}${ProductApiPath.GET_PRODUCTS}${id}`
    return this._http.get<Product>(request);

  }

}
