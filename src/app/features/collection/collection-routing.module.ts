import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckProductDetailsGuard } from './guards/check-product-details.guard';
import { CheckProductSearchParamsGuard } from './guards/check-product-search-params.guard';

import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductsComponent } from './pages/products/products.component';

const routes: Routes = [
  { path: 'search/products', component: ProductsComponent, canActivate: [CheckProductSearchParamsGuard] },
  { path: ':categoryid/products/:productid', component: ProductDetailsComponent, canActivate: [CheckProductDetailsGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionRoutingModule { }
