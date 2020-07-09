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

  public showNewProduct: boolean;
  public showProductForm = false;
  public formProduct: FormGroup;
  public formImage: FormGroup;
  public message: string;
  public imagePath;
  taxes = new FormControl();
  imgURL: any;

  constructor(
    private dashboardFacade: DashboardFacade
  ) {
    const { required } = Validators;
    this.formProduct = new FormGroup({
      code: new FormControl('', [required]),
      name: new FormControl('', [required]),
      value: new FormControl('', [required]),
      taxes: new FormControl(this.taxes, [required])
    });
    this.formImage = new FormGroup({
      image: new FormControl('', [required])
    });
  }

  ngOnInit(): void {
    this.dashboardFacade.fetchProducts(1);
  }

  get products$(): Observable<Product[]> {
    return this.dashboardFacade.products$;
  }

  get taxes$(): Observable<Tax[]> {
    return this.dashboardFacade.taxes$;
  }

  public createProduct() {
    if (this.formProduct.invalid)
      return;
    this.showNewProduct = false;
  }

  preview(files) {
    this.message = '';
    if (files.length === 0)
      return;
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Solamente se permite imagenes';
      return;
    }
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

}
