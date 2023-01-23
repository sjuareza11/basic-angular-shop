import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { productFilterMock } from 'src/app/mocks/filters.mock';
import { mockCategories } from './../../../../../mocks/categories.mock';
import { selectCategories } from './../../../store/selectors/products.selectors';
import { ProductFilterBarValidationService } from './product-filter-bar-validation.service';

import { ProductFilterBarComponent } from './product-filter-bar.component';

describe('ProductFilterBarComponent', () => {
  let component: ProductFilterBarComponent;
  let fixture: ComponentFixture<ProductFilterBarComponent>;
  let productFilterBarValidationService: ProductFilterBarValidationService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductFilterBarComponent],
      providers: [FormBuilder, ProductFilterBarValidationService, provideMockStore({
        initialState: { categories: mockCategories },
        selectors: [
          { selector: selectCategories, value: mockCategories },]
      })],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],

    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductFilterBarComponent);
    component = fixture.componentInstance;
    productFilterBarValidationService = TestBed.inject(ProductFilterBarValidationService);
    fixture.detectChanges();
  });

  it('should build form method when component is initialized', () => {
    expect(component.productFilterBarForm).toBeDefined();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set form default values', () => {
    const defaultProductfilterBar = { ...productFilterMock, category: { id: mockCategories[0].id, name: mockCategories[0].name } };
    component.defaultProductfilterBar = defaultProductfilterBar;
    expect(component.productFilterBarForm.getRawValue()).toEqual(defaultProductfilterBar);
  });

  it('should emit the applyFilters event with the correct data', () => {
    let applyFiltersSpy = spyOn(component.applyFilters, 'emit');
    component.productFilterBarForm.get('title')?.setValue('Test name');
    component.onSubmit();
    expect(applyFiltersSpy).toHaveBeenCalledWith({
      title: 'Test name',
      category: {
        id: undefined,
        name: undefined
      },
      minPrice: null,
      maxPrice: null
    } as any);
  });

  it('should call listenerCategories on init', () => {
    spyOn(component, 'listenerCategories');
    component.ngOnInit();
    expect(component.listenerCategories).toHaveBeenCalled();
  });

  it('should listen categories from store', () => {
    component.listenerCategories();
    expect(component.categories).toEqual(mockCategories);
  });

  it('should call ngOnDestroy and unsubscribe from _ngUnsubscribe$', () => {
    const spyUnsubscribeNext = spyOn((component as any)._ngUnsubscribe$, 'next');
    const spyUnsubscribeComplete = spyOn((component as any)._ngUnsubscribe$, 'complete');
    component.ngOnDestroy();
    expect(spyUnsubscribeNext).toHaveBeenCalled();
    expect(spyUnsubscribeComplete).toHaveBeenCalled();
  });
});
