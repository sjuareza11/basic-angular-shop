import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { CheckProductSearchParamsGuard } from './check-product-search-params.guard';

describe('CheckProductSearchParamsGuard', () => {
  let guard: CheckProductSearchParamsGuard;
  let router: Router;
  let route: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [CheckProductSearchParamsGuard]
    });
    guard = TestBed.inject(CheckProductSearchParamsGuard);
    router = TestBed.inject(Router);
    route = new ActivatedRouteSnapshot();
  });

  it('should create an instance', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if queryParams is not empty', () => {
    route.queryParams = { title: 'Test' };
    const result = guard.canActivate(route, state);
    expect(result).toBeTruthy();
  });

  it('should navigate to home and return false if queryParams is empty', () => {
    route.queryParams = {};
    const spy = spyOn(router, 'navigate');
    const result = guard.canActivate(route, state);
    expect(spy).toHaveBeenCalledWith(['/home']);
    expect(result).toBeFalsy();
  });
});
