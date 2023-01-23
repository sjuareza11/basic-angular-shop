export interface ProductFilterBar {
  title: string;
  category: {
    id: number,
    name: string
  },
  minPrice: number;
  maxPrice: number;
}
