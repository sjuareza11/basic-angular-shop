import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { CategoriesApiService } from 'src/app/core/services/categories-api.service';
import { mockCategories, MockCategoriesApiService } from 'src/app/mocks/categories.mock';
import { initialState } from '../reducers/collection.reducer';
import { loadAllCategoriesRequest, loadAllCategoriesSuccess } from './../actions/categories.actions';
import { CategoriesEffects } from './categories.effects';



describe('CategoriesEffects', () => {
  let actions$: Observable<any>;
  let effects: CategoriesEffects;
  let categoriesApiService: CategoriesApiService;
  let store: MockStore

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CategoriesEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
        { provide: CategoriesApiService, useClass: MockCategoriesApiService }
      ]
    });

    effects = TestBed.inject(CategoriesEffects);
    store = TestBed.inject(MockStore);
    categoriesApiService = TestBed.inject(CategoriesApiService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
  describe('loadAllCategoriessRequest$', () => {
    it('should fire if categories is empty', (done) => {
      const spy = spyOn(categoriesApiService, 'getAllCategories').and.callThrough();
      actions$ = of(loadAllCategoriesRequest);
      effects.loadAllCategoriessRequest$.subscribe((res) => {
        expect(res).toEqual(loadAllCategoriesSuccess({ categories: mockCategories }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });
});
