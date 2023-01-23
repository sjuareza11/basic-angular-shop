import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { mockProducts } from 'src/app/mocks/products.mock';
import { selectCurrentProductActive } from '../store/selectors/products.selectors';

import { CheckProductDetailsGuard } from './check-product-details.guard';

describe('CheckProductDetailsGuard', () => {
  let guard: CheckProductDetailsGuard;
  let route: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [CheckProductDetailsGuard, provideMockStore({
        initialState: { currentProductActive: mockProducts[0] },
        selectors: [
          { selector: selectCurrentProductActive, value: mockProducts[0] },]
      })]
    });
    guard = TestBed.inject(CheckProductDetailsGuard);
    route = new ActivatedRouteSnapshot();
  });

  it('should create an instance', () => {
    expect(guard).toBeTruthy();
  });

  it('should return false if productid is not provided', () => {
    route.params = {};
    const result = guard.canActivate(route, state);
    expect(result).toBeFalsy();
  });

  it('should return true if product is active', () => {
    route.params = { productid: 1 };
    (guard.canActivate(route, state) as any).subscribe((result: any) => {
      expect(result).toBeTruthy();
    });
  });


});
