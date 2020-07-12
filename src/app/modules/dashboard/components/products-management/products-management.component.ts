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
  taxes = new FormControl();
  imgURL: any;
  prueba = 'https://zuama.blob.core.windows.net/dev/lider-sin-azucar.png';
  constructor(
    private dashboardFacade: DashboardFacade
  ) {
    const { required } = Validators;
    this.formProduct = new FormGroup({
      code: new FormControl('', [required]),
      name: new FormControl('', [required]),
      value: new FormControl('', [required])
    });
    this.formImage = new FormGroup({
      image: new FormControl('', [required])
    });
  }

  ngOnInit(): void {
    this.dashboardFacade.fetchProducts(1);
    this.formImage.valueChanges.subscribe(console.log);
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
    const product = new Product();
    product.code =  this.formProduct.controls.code.value;
    product.url = 'https://zuama.blob.core.windows.net/dev/lider-sin-azucar.png';
    product.tax = this.taxes.value;
    product.value = this.formProduct.controls.value.value;
    product.name = this.formProduct.controls.name.value;
    this.dashboardFacade.createProduct(product);
    this.closeNewProduct();
  }

  public loadImage() {
    const uploadData = new FormData();
    uploadData.append('file', this.formImage.get('image').value);
    uploadData.append('path', 'dev');
    this.dashboardFacade.loadImage(uploadData);
  }

  public updateProductForm(product: Product): void {
    this.showNewProduct = true;
    this.formImage.controls.image.setValue('');
    this.formProduct.controls.code.setValue (product.code);
    this.formProduct.controls.name.setValue (product.name);
    this.formProduct.controls.value.setValue (product.value);
    this.taxes.setValue(product.tax);
    this.imgURL = product.url_image;
  }

  public updateProduct(product: Product) {
    this.dashboardFacade.updateProduct(product);
  }

  public closeNewProduct() {
      this.showNewProduct = false;
      this.formProduct.reset();
      this.taxes.reset();
      this.showProductForm = false;
      this.imgURL = null;
      this.formImage.reset();
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
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

}
