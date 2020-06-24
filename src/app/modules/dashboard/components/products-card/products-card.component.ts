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
  @Output() addProduct: EventEmitter<Product> = new EventEmitter();
  @Output() removeProduct: EventEmitter<Product> = new EventEmitter();

  get hasAddedProduct(): boolean {
    return this.basket.products.some(product => this.product.id === product.id);
  }

  get quantity(): number {
    return this.basket.products.filter(product => product.id === this.product.id).length;
  }

  public addProductToBasket(): void {
    this.addProduct.emit(this.product);
  }

  public removeProductToBasket(): void {
    this.removeProduct.emit(this.product);
  }

}