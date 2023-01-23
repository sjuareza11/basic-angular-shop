import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { productFilterBarFormMock } from 'src/app/mocks/filters.mock';
import { mockCategories } from './../../../../../mocks/categories.mock';

import { ProductFilterBarValidationService } from './product-filter-bar-validation.service';

describe('ProductFilterBarValidationService', () => {
  let service: ProductFilterBarValidationService;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      providers: [ProductFilterBarValidationService, FormBuilder],
    });
    service = TestBed.inject(ProductFilterBarValidationService);
    formBuilder = TestBed.inject(FormBuilder);
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });

  it('should build the form correctly', () => {
    const form = service.buildForm();
    expect(form.get('title')).toBeDefined();
    expect(form.get('category')).toBeDefined();
    expect(form.get('minPrice')).toBeDefined();
    expect(form.get('maxPrice')).toBeDefined();
  });

  it('should set default values correctly', () => {
    const form = formBuilder.group({
      title: undefined,
      category: [{
        id: undefined,
        name: undefined
      }],
      minPrice: undefined,
      maxPrice: undefined
    });
    (service as any)._productFilterBarForm = form;

    service.setDefaultValues(productFilterBarFormMock);
    expect(form.value).toEqual(productFilterBarFormMock as any);
  });

  it('should call the atLeastOneValidator when the form is invalid and empty', () => {
    const form = service.buildForm();
    form.setValue({ title: '', category: { id: undefined, name: undefined }, minPrice: '', maxPrice: '' });
    form.updateValueAndValidity();
    expect((form as any).errors).toEqual({ 'atLeastOne': 'Debes rellenar al menos un campo' });
  })

  it('should set the correct category object when passed a list of categories', () => {

    const categoryControl = service.buildForm().get('category');
    categoryControl?.setValue({ id: 1 });
    service.setDefaultCategoryObject(mockCategories);
    expect(categoryControl?.value).toEqual({ id: mockCategories[0].id, name: mockCategories[0].name });
  });

});

