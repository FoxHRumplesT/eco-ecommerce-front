import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxNotificationStatusMsg } from 'ngx-notification-msg';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, debounceTime, filter } from 'rxjs/operators';

import { DashboardFacade } from '../../dashboard.facade';
import { Product, Tax, ProductsResponse } from '../../dashboard.entities';
import { ModalComponent } from '../modal/modal.component';
import { Constants } from '../../dashboard.constants';

@Component({
  selector: 'app-products-management',
  templateUrl: './products-management.component.html',
  styleUrls: ['./products-management.component.sass']
})
export class ProductsManagementComponent implements OnInit, OnDestroy {

  public showProductForm = false;
  public showProductImageStep = true;
  public formProduct: FormGroup;
  public formSearch: FormGroup;
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
      tax: new FormControl([], [required])
    });

    this.formSearch = new FormGroup({
      keyword: new FormControl()
    });
  }

  ngOnInit(): void {
    this.dashboardFacade.fetchProducts(1, '');
    this.subscriptions.push(
      this.formSearch.controls.keyword.valueChanges.pipe(debounceTime(Constants.debounceTime))
        .subscribe(value => this.dashboardFacade.fetchProducts(1, value))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  get products$(): Observable<Product[]> {
    return this.dashboardFacade.products$.pipe(
      filter(p => !!p),
      map(p => p.results)
    );
  }

  get taxes$(): Observable<Tax[]> {
    return this.dashboardFacade.taxes$;
  }

  get paginatorInfo$(): Observable<ProductsResponse> {
    return this.dashboardFacade.products$;
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

  public openCreateForm(): void {
    this.closeNewProduct();
    this.showProductForm = true;
  }

  public goToProductInfoStep() {
    this.showProductImageStep = !this.showProductImageStep;
  }

  public createOrEditProduct() {
    const formData = new FormData();
    formData.append('file', this.uploadedImage);
    formData.append('path', 'dev');
    if (!this.isEditingProduct) {
      this.dashboardFacade.createProduct(this.formProduct.value, formData);
    } else {
      this.dashboardFacade.updateProduct({...this.formProduct.value, urlImage: this.uploadedImage ? '' : this.previewImageURL}, formData);
      this.isEditingProduct = false;
    }
    this.closeNewProduct();
  }

  public setProductToEdit({ code, name, value, url_image, tax }: Product): void {
    this.buttonName = 'Modificar';
    this.showProductForm = true;
    this.isEditingProduct = true;
    this.showProductImageStep = true;
    this.formProduct.setValue({ tax, code, name, value });
    this.previewImageURL = url_image;
  }

  public closeNewProduct() {
    this.buttonName = 'Crear';
    this.showProductForm = false;
    this.isEditingProduct = false;
    this.showProductImageStep = true;
    this.previewImageURL = null;
    this.uploadedImage = null;
    this.formProduct.reset();
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

  public goToPage(page: number): void {
    this.dashboardFacade.fetchProducts(page, '');
  }

}
