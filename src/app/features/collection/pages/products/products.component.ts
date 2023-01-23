import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/models/product';
import { State } from '../../store/reducers/collection.reducer';
import { selectProducts } from '../../store/selectors/products.selectors';
import { ProductQueryParamsAdapter } from './../../adapters/product-query-params.adapter';
import { ProductFilterBar } from './../../models/product-filter-bar';
import { ProductsService } from './products.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductsService],
})
export class ProductsComponent implements OnInit {

  public products$: Observable<Product[]> = this._store.select(selectProducts);

  constructor(public productService: ProductsService, private _store: Store<State>, private _router: Router) { }

  public ngOnInit(): void {
    this.productService.listenerRouterQueryParams();
  }

  public navigateByFilters($event: ProductFilterBar): void {
    const productQueryParamsAdapter: ProductQueryParamsAdapter = new ProductQueryParamsAdapter();
    this._router.navigate(['collection/search/products'], { queryParams: { ...productQueryParamsAdapter.adapt($event) } });
  }

}
