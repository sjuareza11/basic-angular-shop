import { Adapter } from "src/app/core/models/adapter";
import { ProductFilterBar } from '../models/product-filter-bar';
import { ProductQueryParams } from '../models/product-query-params';


export class ProductQueryParamsAdapter implements Adapter<ProductQueryParams> {
  public adapt(filters: ProductFilterBar): ProductQueryParams {
    return {
      title: filters.title && filters.title.length ? filters.title : undefined,
      price_min: filters.minPrice,
      price_max: filters.maxPrice,
      categoryId: filters.category?.id,
    } as ProductQueryParams
  }
}
