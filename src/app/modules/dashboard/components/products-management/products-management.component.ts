import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxNotificationStatusMsg } from 'ngx-notification-msg';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { DashboardFacade } from '../../dashboard.facade';
import { Product, Tax } from '../../dashboard.entities';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-products-management',
  templateUrl: './products-management.component.html',
  styleUrls: ['./products-management.component.sass']
})
export class ProductsManagementComponent implements OnInit, OnDestroy {

  public showProductForm = false;
  public showProductImageStep = true;
  public formProduct: FormGroup;
  public uploadedImage: File;
  public previewImageURL: string | ArrayBuffer;
  private isEditingProduct = false;
  private subscriptions: Subscription[] = [];
  public buttonName = 'Crear';

  constructor(
    private dashboardFacade: DashboardFacade,
    public dialog: MatDialog
  ) {
    const { required } = Validators;
    this.formProduct = new FormGroup({
      code: new FormControl('', [required]),
      name: new FormControl('', [required]),
      value: new FormControl('', [required]),
      taxes: new FormControl([], [required])
    });
  }

  ngOnInit(): void {
    this.dashboardFacade.fetchProducts(1);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  get products$(): Observable<Product[]> {
    return this.dashboardFacade.products$;
  }

  get taxes$(): Observable<Tax[]> {
    return this.dashboardFacade.taxes$;
  }

  public setImagePreview(files: FileList): void {
    if (!files.length) return;

    const mimeType = files[0].type;
    if (!mimeType.match(/image\/*/)) {
      this.dashboardFacade.sendMessage('El archivo debe ser una imagen', NgxNotificationStatusMsg.FAILURE);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.previewImageURL = reader.result;
    };
    this.uploadedImage = files.item(0);
  }

  public goToProductInfoStep() {
    this.showProductImageStep = !this.showProductImageStep;
  }

  public createOrEditProduct() {
    if (!this.isEditingProduct) {
      const formData = new FormData();
      formData.append('file', this.uploadedImage);
      formData.append('path', 'dev');
      this.dashboardFacade.createProduct(this.formProduct.value, formData);
    } else {
      this.dashboardFacade.updateProduct({
        ...this.formProduct.value, urlImage: this.previewImageURL
      });
      this.isEditingProduct = false;
    }
    this.closeNewProduct();
  }

  public setProductToEdit({ code, name, value, url_image}: Product): void {
    this.buttonName = 'Modificar';
    this.showProductForm = true;
    this.isEditingProduct = true;
    this.formProduct.setValue({ taxes: [1, 2], code, name, value });
    this.previewImageURL = url_image;
  }

  public closeNewProduct() {
    this.showProductForm = false;
    this.formProduct.reset();
    this.previewImageURL = null;
    this.uploadedImage = null;
  }

  public openDeleteModal(product: Product): void {
    const message = '¿Estás  seguro de eliminar ' + product.name + '?';
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
      disableClose: true,
      data: { message }
    });

    this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
      if (result) this.dashboardFacade.deleteProduct(product);
    }));
  }

}
