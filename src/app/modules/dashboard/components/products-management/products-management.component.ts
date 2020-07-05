import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DashboardFacade } from '../../dashboard.facade';
import { Product, Basket, Tax, Result, CalculateTaxesPayload } from '../../dashboard.entities';
@Component({
  selector: 'app-products-management',
  templateUrl: './products-management.component.html',
  styleUrls: ['./products-management.component.sass']
})
export class ProductsManagementComponent implements OnInit {

  public stepOne = true;
  public stepTwo = false;
  public showNewProduct: boolean;

  public formProduct: FormGroup;

  constructor(
    private dashboardFacade: DashboardFacade
  ) {
    const { required} = Validators;
    this.formProduct = new FormGroup({
      code: new FormControl('', [required]),
      name: new FormControl('', [required]),
      value: new FormControl('', [required]),
      iva: new FormControl('', [required]),
      quantity: new FormControl('', [required]),
      taxType: new FormControl('', [required]),
      taxValue: new FormControl('', [required])
    });
  }

  ngOnInit(): void {
    this.dashboardFacade.fetchProducts(1);
  }

  get products$(): Observable<Product[]> {
    return this.dashboardFacade.products$;
  }

  public createProduct() {
    if (this.formProduct.invalid)
      return;
    this.showNewProduct = false;
  }

}
