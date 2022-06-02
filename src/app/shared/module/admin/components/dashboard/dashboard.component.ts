import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from 'src/app/shared/models/product.model';
import { MockService } from 'src/app/shared/services/mock.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  allProducts: Product[] = [];
  filterProducts = [];
  page: number = 1;

  constructor(
    private mockService: MockService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.allProducts = this.filterProducts = this.mockService.getAllProducts();
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  onSearchItem(value: string) {
    this.filterProducts = this.allProducts.filter((item) =>
      item.title.toLowerCase().includes(value.trim().toLowerCase())
    );
  }

  onDelete(prod) {
    const index = this.filterProducts.indexOf(prod);
    this.filterProducts.splice(index, 1);
  }
}
