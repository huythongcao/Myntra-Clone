import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  private wishList = [];
  constructor() {
    let savedWish = localStorage.getItem('wish');
    if (savedWish) {
      this.wishList = JSON.parse(savedWish);
    }
  }

  getWishList() {
    return this.wishList;
  }

  addWishList(prod) {
    let index = this.wishList.findIndex(
      (c) => c.product_id === prod.product_id
    );
    if (index == -1) {
      prod.inventory = 1;
      this.wishList.push(prod);
    } else {
      this.wishList[index].inventory++;
    }

    localStorage.setItem('wish', JSON.stringify(this.wishList));
  }

  removeWishList(prod) {
    let index = this.wishList.findIndex(
      (c) => c.product_id === prod.product_id
    );
    if (index !== -1) {
      this.wishList[index].inventory--;
      if (this.wishList[index].inventory == 0) {
        this.wishList.splice(index, 1);
      }
    }

    localStorage.setItem('wish', JSON.stringify(this.wishList));
  }

  getWishListQuantity() {
    return this.wishList.reduce((accu, p) => {
      return accu + p.inventory;
    }, 0);
  }

  getWishListTotalPrice() {
    return this.wishList.reduce((accu, p) => {
      return accu + p.inventory * p.variant_price;
    }, 0);
  }
}