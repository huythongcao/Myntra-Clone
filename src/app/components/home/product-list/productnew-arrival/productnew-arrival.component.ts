import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/models/product.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { WishListService } from 'src/app/shared/services/wish-list.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-productnew-arrival',
  templateUrl: './productnew-arrival.component.html',
  styleUrls: ['./productnew-arrival.component.scss'],
})
export class ProductnewArrivalComponent implements OnInit {
  @Input() productsNewArrival;
  constructor(
    private authService: AuthService,
    private router: Router,
    public cartService: CartService,
    public wishListService: WishListService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  getPrice(price: string) {
    let splitArr = price.split('.');
    return splitArr[0];
  }

  onAddProduct(prod: Product) {
    if (this.authService.isLoggedIn()) {
      this.toastr.success('You have added item in the cart!');
      this.cartService.addItem(prod);
    } else {
      Swal.fire('Oops', 'You have to login first', 'error').then((results) => {
        if (results.isConfirmed) {
          this.router.navigateByUrl('/sign-in');
        }
      });
    }
  }

  onAddWishList(prod: Product) {
    if (this.authService.isLoggedIn()) {
      this.toastr.success('You have added item in the wishlist!');
      this.wishListService.addWishList(prod);
    } else {
      Swal.fire('Oops', 'You have to login first', 'error').then((results) => {
        if (results.isConfirmed) {
          this.router.navigateByUrl('/sign-in');
        }
      });
    }
  }
}
