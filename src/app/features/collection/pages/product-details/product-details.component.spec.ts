import { Location } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { mockProducts } from 'src/app/mocks/products.mock';
import { selectCurrentProductActive } from '../../store/selectors/products.selectors';

import { ProductDetailsComponent } from './product-details.component';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let location: Location;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDetailsComponent],
      providers: [provideMockStore({
        initialState: { currentProductActive: mockProducts[0] },
        selectors: [
          { selector: selectCurrentProductActive, value: mockProducts[0] },]
      }),],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductDetailsComponent);
    location = TestBed.inject(Location)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('when product is loaded', () => {

    it('should show the first image as main image', () => {
      expect(component.mainProductImage?.nativeElement.src).toEqual(mockProducts[0].images[0])
    });

    it('should show the second image as main image', () => {
      component.changeImage(mockProducts[0].images[1])
      expect(component.mainProductImage?.nativeElement.src).toEqual(mockProducts[0].images[1])
    });

    it('should go back to the previous page', () => {
      const spy = spyOn(location, 'back').and.callThrough();
      component.goBack();
      expect(spy).toHaveBeenCalled();
    });
  });
});
