import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Product, Basket } from '../../dashboard.entities';

@Component({
  selector: 'app-products-basket-card',
  templateUrl: './products-basket-card.component.html',
  styleUrls: ['./products-basket-card.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsBasketCardComponent {

  @Input() product: Product;
  @Input() basket: Basket;

  get quantity(): number {
    return this.basket.products.filter(product => product.id === this.product.id).length;
  }

  get total(): number {
    let total = 0;
    this.basket.products.forEach(product => {
      if (product.id === this.product.id) total += product.value;
    });
    return total;
  }

}
