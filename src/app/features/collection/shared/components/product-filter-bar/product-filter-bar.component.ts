import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Category } from 'src/app/core/models/category';
import { ProductFilterBar } from '../../../models/product-filter-bar';
import { loadAllCategoriesRequest } from '../../../store/actions/categories.actions';
import { selectCategories } from '../../../store/selectors/products.selectors';

import { ProductFilterBarValidationService } from './product-filter-bar-validation.service';

@Component({
  selector: 'app-product-filter-bar',
  templateUrl: './product-filter-bar.component.html',
  styleUrls: ['./product-filter-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ProductFilterBarValidationService]

})
export class ProductFilterBarComponent implements OnInit, OnDestroy {
  @Input() public set defaultProductfilterBar(defaultProductfilterBar: ProductFilterBar | undefined) {
    if (defaultProductfilterBar) {
      this.productFilterBarValidation.setDefaultValues(defaultProductfilterBar);
      this.productFilterBarValidation.setDefaultCategoryObject(this.categories);
    }
  }
  @Output() public applyFilters: EventEmitter<ProductFilterBar> = new EventEmitter<ProductFilterBar>();
  public productFilterBarForm: FormGroup;
  public categories: Category[] = [];
  private _ngUnsubscribe$: Subject<void> = new Subject<void>();
  private categories$: Observable<Category[]> = this._store.select(selectCategories);


  constructor(public productFilterBarValidation: ProductFilterBarValidationService, private _store: Store) {
    this.productFilterBarForm = this.productFilterBarValidation.buildForm();
  }

  public ngOnInit(): void {
    this._store.dispatch(loadAllCategoriesRequest());
    this.listenerCategories();
  }

  public ngOnDestroy(): void {
    this._ngUnsubscribe$.next();
    this._ngUnsubscribe$.complete();
  }

  public listenerCategories(): void {
    this.categories$.pipe(
      takeUntil(this._ngUnsubscribe$)
    ).subscribe(categories => {
      this.categories = categories;
      this.productFilterBarValidation.setDefaultCategoryObject(this.categories);
    })
  }

  public onSubmit(): void {
    this.applyFilters.emit(this.productFilterBarForm.getRawValue() as ProductFilterBar)
  }

}
