import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { first, map, Observable, skip } from 'rxjs';
import { loadProductDetailsRequest } from '../store/actions/products.actions';
import { selectCurrentProductActive } from '../store/selectors/products.selectors';

@Injectable({
  providedIn: 'root',
})
export class CheckProductDetailsGuard implements CanActivate {
  public currentProductActive$ = this._store.select(selectCurrentProductActive)
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const productId: number = route.params['productid'];
    if (productId !== null && productId !== undefined) {
      this._store.dispatch(loadProductDetailsRequest({ id: productId }))
    } else {
      return false
    }
    return this.currentProductActive$.pipe(
      skip(1),
      first(),
      map(product => product && Object.keys(product).length > 0)
    );
  }



  constructor(private _store: Store) { }
}
