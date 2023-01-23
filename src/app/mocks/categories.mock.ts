import { of } from "rxjs";

export const mockCategories = [{ "id": 1, "name": "Clothes", "image": "https://api.lorem.space/image/fashion?w=640&h=480&r=3023", "creationAt": "2023-01-22T05:51:34.000Z", "updatedAt": "2023-01-22T05:51:34.000Z" }, { "id": 2, "name": "Electronics", "image": "https://api.lorem.space/image/watch?w=640&h=480&r=3135", "creationAt": "2023-01-22T05:51:34.000Z", "updatedAt": "2023-01-22T05:51:34.000Z" }, { "id": 3, "name": "Furniture", "image": "https://api.lorem.space/image/furniture?w=640&h=480&r=3675", "creationAt": "2023-01-22T05:51:34.000Z", "updatedAt": "2023-01-22T05:51:34.000Z" }, { "id": 4, "name": "Shoes", "image": "https://api.lorem.space/image/shoes?w=640&h=480&r=9392", "creationAt": "2023-01-22T05:51:34.000Z", "updatedAt": "2023-01-22T05:51:34.000Z" }, { "id": 5, "name": "Others", "image": "https://api.lorem.space/image?w=640&h=480&r=2579", "creationAt": "2023-01-22T05:51:34.000Z", "updatedAt": "2023-01-22T05:51:34.000Z" }];

export class MockCategoriesApiService {
  getAllCategories() {
    return of(mockCategories);
  }
}
