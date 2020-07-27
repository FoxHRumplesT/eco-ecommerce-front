import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, OnInit } from '@angular/core';

import { Product, Basket, Tax, Result } from '../../dashboard.entities';

@Component({
  selector: 'app-products-basket-card',
  templateUrl: './products-basket-card.component.html',
  styleUrls: ['./products-basket-card.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsBasketCardComponent implements OnInit {

  public isCollapsed = true;
  public isEditing = false;
  public newValue: number;
  @Input() product: Product;
  @Input() basket: Basket;
  @Input() taxes: Tax[] = [];
  @Input() result: Result;
  @Output() toggleIsFree: EventEmitter<Product> = new EventEmitter();
  @Output() newProductValue: EventEmitter<Product> = new EventEmitter();


  ngOnInit(): void{
    this.newValue = this.product.value;
  }

  get total(): number {
    let total = 0;
    this.basket.products.forEach(product => {
      if (product.id === this.product.id) total += product.value;
    });
    return total;
  }

  get productTaxes(): Tax[] {
    const key = this.product.code + '_' + this.product.lot;
    if (this.result.summary[key] !== undefined) {
      return this.result.summary[key].tax;
    } else {
      return this.product.tax.map(t => this.taxes.find(_t => _t.id === t));
    }

  }

  public updateNewProduct(newValue: number): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing && newValue !== null) {
      this.onNewProductValue(newValue);
      this.isCollapsed = false;
    }
  }

  public getTotalTax(tax: Tax): number {
    return tax.value * this.product.value / 100;
  }

  public onToggleIsFree(): void {
    this.toggleIsFree.emit(this.product);
  }

  public onNewProductValue(newValue: number): void {
    this.newProductValue.emit({ ...this.product, value: Number(newValue) });
  }


}
