import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryApiPath } from '../enums/category-api-path';
import { Category } from '../models/category';

@Injectable()
export class CategoriesApiService {

  private readonly _apiUrl = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  public getAllCategories(): Observable<Category[]> {
    const request = `${this._apiUrl}${CategoryApiPath.GET_ALL_CATEGORIES}`
    return this._http.get<Category[]>(request)

  }
}
