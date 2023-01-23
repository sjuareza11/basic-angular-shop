import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { productFilterMock } from './../../../../mocks/filters.mock';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { productQueryParamsMock } from 'src/app/mocks/router-params.mock';
import { ProductsComponent } from './products.component';
import { ProductsService } from './products.service';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [ProductsService, provideMockStore({})],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],

    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router)

  });

  it('should create', () => {
    expect(component).toBeTruthy()
  });

  it('should navigate url by filters', () => {
    const component = fixture.componentInstance;
    const navigateSpy = spyOn(router, 'navigate');
    component.navigateByFilters(productFilterMock);
    expect(navigateSpy).toHaveBeenCalledWith(['collection/search/products'], { queryParams: productQueryParamsMock });
  });
});
