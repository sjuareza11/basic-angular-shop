import { ProductFilterBar } from './../features/collection/models/product-filter-bar';
export const productFilterMock: ProductFilterBar = {
  title: 'TEST',
  category: {
    id: 1,
    name: ''
  },
  minPrice: 5,
  maxPrice: 10
}

export const productFilterBarFormMock = {
  title: 'Test title',
  category: { id: 1, name: 'Test category' },
  minPrice: 100,
  maxPrice: 200
};
