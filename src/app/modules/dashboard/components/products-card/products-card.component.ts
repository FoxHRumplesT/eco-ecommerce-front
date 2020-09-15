import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Product, Basket } from '../../dashboard.entities';

@Component({
  selector: 'app-products-card',
  templateUrl: './products-card.component.html',
  styleUrls: ['./products-card.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsCardComponent {

  public quantity = 1;

  @Input() product: Product;
  @Input() basket: Basket;
  @Input() isBasket: boolean;
  @Output() addProduct: EventEmitter<Product> = new EventEmitter();
  @Output() removeProduct: EventEmitter<Product> = new EventEmitter();
  @Output() setProductToEdit: EventEmitter<Product> = new EventEmitter();
  @Output() openDeleteModal: EventEmitter<Product> = new EventEmitter();
  @Output() openStockModal: EventEmitter<Product> = new EventEmitter();

  get enableAddAction(): boolean {
    return this.quantity <= this.product.quantity;
  }

  get enableRemoveAction(): boolean {
    return this.quantity <= this.product.quantity;
  }

  public addProductToBasket(): void {
    const product = this.basket.products.find(p => p.id === this.product.id);
    if (!!product && product.quantity === this.product.quantity) return;
    for (let i = 0; i < this.quantity; i++) {
      this.addProduct.emit(this.product);
    }
  }

  public removeProductToBasket(): void {
    for (let i = 0; i < this.quantity; i++) {
      this.removeProduct.emit(this.product);
    }
  }

}
