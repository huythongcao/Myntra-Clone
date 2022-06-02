import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Mock } from 'protractor/built/driverProviders';
import { Product } from 'src/app/shared/models/product.model';
import { MockService } from 'src/app/shared/services/mock.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  public allProducts: Product[] = [];
  public products: Product[] = [];
  public filteredProducts: Product[] = [];

  @ViewChild('search') searchInput: ElementRef;


  // public total_pages = [];
  public total_pages: number;
  public paginationLength: number;
  public currentPage: number = 1;
  public limit: number;
  private categoryClicked = false;
  private searchTouched = false;

  public allGenders = new Set();
  public allProductTypes = new Set();
  public allColors = new Set();
  public allPrices = new Set();
  public allBrands = new Set();

  constructor(
    private mockService: MockService,
    private productService: ProductService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.limit = this.productService.limit;
    this.filteredProducts = this.allProducts =
      this.mockService.getAllProducts();
    this.paginationLength = this.filteredProducts.length;
    this.total_pages = Math.ceil(this.paginationLength / this.limit);

    this.allProducts.forEach((product) => {
      this.allGenders.add(product.ideal_for);
      this.allProductTypes.add(product.product_type);
      this.allColors.add(product.dominant_color);
      this.allPrices.add(product.variant_price);
      this.allBrands.add(product.brand);
    });

    // Spinner
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  searchProducts(value) {
    this.filteredProducts = this.allProducts.filter((item) =>
      item.title.toLowerCase().includes(value.trim().toLowerCase())
    );2
    this.paginationLength = this.filteredProducts.length;
    this.total_pages = Math.ceil(this.paginationLength / this.limit);
    this.currentPage = 1;
  }

  getProductByCategory(category, option) {
    if (category == 'variant_price') {
      let range = option.target.innerText;
      if (!range.includes('-')) {
        this.filteredProducts = this.allProducts.filter(
          (item) => item[category] >= Number(range.replace('+', ''))
        );
      } else {
        let arrayRage = range.replaceAll('₹', '').split('-');
        this.filteredProducts = this.allProducts.filter(
          (item) =>
            item[category] >= Number(arrayRage[0]) &&
            item[category] < Number(arrayRage[1])
        );
      }
    } else {
      this.filteredProducts = this.allProducts.filter(
        (item) => item[category] == option
      );
    }
    this.paginationLength = this.filteredProducts.length;
    this.total_pages = Math.ceil(this.paginationLength / this.limit);
    this.currentPage = 1;
    this.backToTop();
  }

  sortProducts(event) {
    if (event.target.value == 'low-to-high') {
      this.filteredProducts.sort(
        (a, b) => Number(a.variant_price) - Number(b.variant_price)
      );
    } else {
      this.filteredProducts.sort(
        (a, b) => Number(b.variant_price) - Number(a.variant_price)
      );
    }
    this.currentPage = 1;

    // Spinner
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  backToTop() {
    this.searchInput.nativeElement.value = '';
    window.scroll({ top: 320, left: 0, behavior: 'smooth' });

    // Spinner
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500); 
  }
}