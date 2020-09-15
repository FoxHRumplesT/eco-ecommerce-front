import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Product } from '../../dashboard.entities';

@Component({
  selector: 'app-products-update-stock',
  templateUrl: './products-update-stock.component.html',
  styleUrls: ['./products-update-stock.component.sass']
})
export class ProductsUpdateStockComponent implements OnInit {

  public form: FormGroup;
  public product: Product;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ProductsUpdateStockComponent>
  ) {
    this.product = data.product;
  }

  ngOnInit(): void {
    console.log(this.product);
    this.form = new FormGroup({
      lot: new FormControl(this.product.lot),
      codeProduct: new FormControl(this.product.code),
      quantity: new FormControl(this.product.quantity),
      saleValue: new FormControl(this.product.value),
      purchaseValue: new FormControl(),
      date: new FormControl(new Date().toISOString())
    });
  }

  public setStock(): void {
    console.log('ssssss', this.form.value);
    this.dialogRef.close(this.form.value);
  }

}
