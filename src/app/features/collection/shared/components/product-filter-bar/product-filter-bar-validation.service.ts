import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Category } from 'src/app/core/models/category';
import { ProductFilterBar } from '../../../models/product-filter-bar';

@Injectable()
export class ProductFilterBarValidationService {
  private _productFilterBarForm: FormGroup | undefined;
  constructor(private _fb: FormBuilder) {

  }

  public buildForm(): FormGroup {
    this._productFilterBarForm = this._fb.group({
      title: undefined,
      category: [{
        id: undefined,
        name: undefined
      }],
      minPrice: undefined,
      maxPrice: undefined
    });
    this._productFilterBarForm.addValidators(this.atLeastOneValidator as ValidatorFn);

    return this._productFilterBarForm;
  }

  public setDefaultValues(value: ProductFilterBar): void {
    this._productFilterBarForm?.patchValue({ ...value });
  }

  public setDefaultCategoryObject(categories: Category[]): void {
    const categoryMatch = categories.find(category => category.id === Number(this._productFilterBarForm?.get('category')?.value.id));
    if (categoryMatch) {
      this._productFilterBarForm?.get('category')?.setValue({ id: categoryMatch.id, name: categoryMatch.name });
    }
  }

  public atLeastOneValidator = (controls: FormGroup): ValidationErrors | null => {
    if (controls) {
      const isEmpty = !Object.values(controls.getRawValue()).filter(value => typeof value !== 'object').some((value) => value !== '' && value !== undefined);
      if (isEmpty && controls.get('category')?.value.id === undefined) {
        return {
          atLeastOne: 'Debes rellenar al menos un campo'
        }
      }
    };

    return null
  }
}
