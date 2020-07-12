import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Product, Basket } from '../../dashboard.entities';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { DashboardFacade } from '../../dashboard.facade';

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
  @Output() updateProduct: EventEmitter<Product> = new EventEmitter();

  constructor(public dialog: MatDialog,
              private dashboardFacade: DashboardFacade) { }
  get hasAddedProduct(): boolean {
    if (this.basket !== undefined)
      return this.basket.products.some(product => this.product.id === product.id);
  }

  get quantity(): number {
    return this.basket.products.find(product => product.id === this.product.id).quantity;
  }

  public addProductToBasket(): void {
    this.addProduct.emit(this.product);
  }

  public removeProductToBasket(): void {
    this.removeProduct.emit(this.product);
  }

  get enableAddAction(): boolean {
    return this.quantity < this.product.quantity;
  }

  get enableRemoveAction(): boolean {
    return this.quantity <= this.product.quantity;
  }

  public updateProductEmit(): void {
    this.updateProduct.emit(this.product);
  }

  public deleteProduct(product: Product) {
    this.dashboardFacade.deleteProduct(product);
  }

  public openDialog(option: string, product: Product): void {
    let titleValue: string;
    let messageValue: string;
    if (option === 'delete') {
      titleValue = '¡ALERTA!',
      messageValue = '¿Estás  seguro de eliminar el registro ' + product.name + '?';
    }
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
      disableClose: true,
      data: { title: titleValue, message: messageValue }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && option === 'delete') {
        this.deleteProduct(product);
      }
    });
  }

}
