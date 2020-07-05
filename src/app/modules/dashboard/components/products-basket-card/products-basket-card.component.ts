import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { Product, Basket, Tax, Summary, Result } from '../../dashboard.entities';

@Component({
  selector: 'app-products-basket-card',
  templateUrl: './products-basket-card.component.html',
  styleUrls: ['./products-basket-card.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsBasketCardComponent {

  public isCollapsed = true;
  public isEditing = false;
  @Input() product: Product;
  @Input() basket: Basket;
  @Input() taxes: Tax[] = [];
  @Input() result: Result;
  @Output() toggleIsFree: EventEmitter<Product> = new EventEmitter();

  get total(): number {
    let total = 0;
    this.basket.products.forEach(product => {
      if (product.id === this.product.id) total += product.value;
    });
    return total;
  }

  get productTaxes(): Tax[] {
    return this.product.tax.map(t => this.taxes.find(_t => _t.id === t));
  }

  get resultSummary(): number {
    if (this.result.summary.length > 0) {
      return this.result.summary[0].taxTotal;
    }
  }

  public onToggleIsFree(): void {
    this.toggleIsFree.emit(this.product);
  }
}
