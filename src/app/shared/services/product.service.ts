import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import products from '../../../assets/data/myntra-products';
import { Product } from '../models/product.model';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  fakeAPI = 'https://dummyjson.com/products';
  constructor(private http: HttpClient, private spinner: NgxSpinnerService) {}

  getFake(): Observable<Product[]> {
    this.spinner.show();
    return this.http.get<Product[]>(this.fakeAPI);
  }

  getAllProducts(): Product[] {
    return products.sort((a, b) => Number(a.product_id) - Number(b.product_id));
  }

  getProductById(id: string) {
    return products.find((item) => item.product_id == id);
  }

  getRelatedProducts(product) {
    return products.filter(
      (item) =>
        item.product_type == product.product_type &&
        item.product_id != product.product_id
    );
  }
}
