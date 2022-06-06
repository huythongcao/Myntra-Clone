import { Injectable } from '@angular/core';
import products from '../../../assets/data/myntra-products';
@Injectable({
  providedIn: 'root',
})
export class MockService {
  constructor() {}

  getAllProducts() {
    return products.sort((a, b) => Number(a.product_id) - Number(b.product_id));
  }
}
