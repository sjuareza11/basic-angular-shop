import { Adapter } from "src/app/core/models/adapter";
import { ProductFilterBar } from './../models/product-filter-bar';
import { ProductQueryParams } from './../models/product-query-params';


export class ProductFilterBarAdapter implements Adapter<ProductFilterBar> {
  public adapt(filters: ProductQueryParams): ProductFilterBar {
    return {
      title: filters?.title,
      category: {
        id: filters?.categoryId,
        name: ''
      },
      maxPrice: filters.price_max,
      minPrice: filters.price_min

    }
  }
}
