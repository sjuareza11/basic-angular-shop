import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CategoriesApiService } from './../../core/services/categories-api.service';
import { ProductApiService } from './../../core/services/product-api.service';
import { CollectionRoutingModule } from './collection-routing.module';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductFilterBarComponent } from './shared/components/product-filter-bar/product-filter-bar.component';
import { CategoriesEffects } from './store/effects/categories.effects';
import { ProductsEffects } from './store/effects/products.effects';
import * as fromCollection from './store/reducers/collection.reducer';
import { ProductCardComponent } from './shared/components/product-card/product-card.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductFilterBarComponent,
    ProductDetailsComponent,
    ProductCardComponent

  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromCollection.collectionFeatureKey, fromCollection.collectionFeatureReducer),
    EffectsModule.forFeature([ProductsEffects, CategoriesEffects]),
    ReactiveFormsModule,
    FormsModule,
    NgbDropdownModule,
    CollectionRoutingModule
  ],
  providers: [ProductApiService, CategoriesApiService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class CollectionModule { }
