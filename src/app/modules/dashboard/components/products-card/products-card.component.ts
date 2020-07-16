import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Product, Basket } from '../../dashboard.entities';

@Component({
  selector: 'app-products-card',
  templateUrl: './products-card.component.html',
  styleUrls: ['./products-card.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsCardComponent {

  @Input() product: Product;
  @Input() basket: Basket;
  @Input() isBasket: boolean;
  @Output() addProduct: EventEmitter<Product> = new EventEmitter();
  @Output() removeProduct: EventEmitter<Product> = new EventEmitter();
  @Output() setProductToEdit: EventEmitter<Product> = new EventEmitter();
  @Output() openDeleteModal: EventEmitter<Product> = new EventEmitter();

  constructor() { }

  get hasAddedProduct(): boolean {
    if (this.basket !== undefined)
      return this.basket.products.some(product => this.product.id === product.id);
  }

  get quantity(): number {
    return this.basket.products.find(product => product.id === this.product.id).quantity;
  }

  get enableAddAction(): boolean {
    return this.quantity < this.product.quantity;
  }

  get enableRemoveAction(): boolean {
    return this.quantity <= this.product.quantity;
  }

  public addProductToBasket(): void {
    this.addProduct.emit(this.product);
  }

  public removeProductToBasket(): void {
    this.removeProduct.emit(this.product);
  }

}
