import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxNotificationStatusMsg } from 'ngx-notification-msg';
import { map, debounceTime, filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { DashboardFacade } from '../../dashboard.facade';
import { Product, Basket, Tax, Result, Client, ProductsResponse, Bill } from '../../dashboard.entities';
import { Constants } from '../../dashboard.constants';
import { ModalComponent } from '../modal/modal.component';
import { ProductsUpdateStockComponent } from '../products-update-stock/products-update-stock.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit, OnDestroy {

  public stepOne = true;
  public stepTwo = false;
  public documentTypes = [
    { value: 'cc', description: 'Cédula' },
    { value: 'nit', description: 'Nit' },
    { value: 'ce', description: 'Extranjería' },
    { value: 'pp', description: 'Pasaporte' }
  ];
  public clientForm: FormGroup;
  public searchForm: FormGroup;
  private billId: number;
  private isUpdatingBill: boolean = false;
  private subscriptions: Subscription[] = [];


  constructor(
    private dashboardFacade: DashboardFacade,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    const { required, email, minLength, maxLength } = Validators;
    this.clientForm = new FormGroup({
      documentType: new FormControl(this.documentTypes[0].value, [required]),
      identificationNumber: new FormControl('', [required]),
      firstName: new FormControl('', [required]),
      lastName: new FormControl('', [required]),
      email: new FormControl('', [required, email]),
      countryCode: new FormControl('+57', [required]),
      phone: new FormControl('', [required, minLength(7), maxLength(10)]),
      billingDate: new FormControl(new Date(), [required]),
      payDate: new FormControl(new Date(), [required]),
      isNew: new FormControl(true, [required]),
    });

    this.searchForm = new FormGroup({
      keyword: new FormControl()
    });
  }

  ngOnInit(): void {
    this.dashboardFacade.fetchProductsInStock(1, '');
    this.subscriptions.push(
      this.clientForm.controls.identificationNumber.valueChanges.pipe(
        debounceTime(Constants.debounceTime)
      ).subscribe(value => this.dashboardFacade.fetchIDNumber(value))
    );
    this.subscriptions.push(
      this.searchForm.controls.keyword.valueChanges.pipe(
        debounceTime(Constants.debounceTime)
      ).subscribe(value => this.dashboardFacade.fetchProductsInStock(1, value))
    );
    this.route.params.pipe(filter(p => !!p.billId)).subscribe(p => {
      this.dashboardFacade.bills$.subscribe(b => {
        const bill: any = b.results.find(_b => _b.id === +p.billId);
        this.billId = bill.id;
        this.clientForm.patchValue({
          isNew: false,
          email: bill.client.email,
          firstName: bill.client.name,
          lastName: bill.client.last_name,
          identificationNumber: bill.client.number_identification,
          documentType: bill.client.document_type,
          countryCode: bill.client.country_code,
          phone: bill.client.phone
        });
        bill.products.summary.forEach(p =>
          this.dashboardFacade.addProductToBasket({ ...p.calculateSummary.product, quantity: 1, is_free: false })
        );
        this.basket$.subscribe(x =>
          this.dashboardFacade.calculateTaxesInBasket(x)
        ).unsubscribe();
      }).unsubscribe();
      this.isUpdatingBill = true;
      // this.dashboardFacade.fetchBillById(+p.billId);
    }).unsubscribe();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  get basket$(): Observable<Basket> {
    return this.dashboardFacade.basket$;
  }

  get products$(): Observable<Product[]> {
    return this.dashboardFacade.products$.pipe(
      filter(p => !!p),
      map(p => p.results)
    );
  }

  get paginatorInfo$(): Observable<ProductsResponse> {
    return this.dashboardFacade.products$;
  }

  get taxes$(): Observable<Tax[]> {
    return this.dashboardFacade.taxes$;
  }

  get result$(): Observable<Result> {
    return this.dashboardFacade.result$;
  }

  get clients$(): Observable<Client[]> {
    return this.dashboardFacade.clients$;
  }

  get isBillButtonDisabled(): boolean {
    return this.stepTwo && this.clientForm.invalid;
  }

  get showCreateClientButton(): void {
    return this.clientForm.valid && this.clientForm.get('isNew').value;
  }

  public differentProducts(products: Product[]): Product[] {
    return products.filter((product, index, self) =>
      index === self.findIndex((t) => t.id === product.id)
    );
  }

  public total(basket: Basket): number {
    let total = 0;
    basket.products.forEach(product => total += product.value);
    return total;
  }

  public addRemoveProductToBasket(type: string, product: Product): void {
    if (type === 'add') this.dashboardFacade.addProductToBasket({ ...product, quantity: 1, is_free: false });
    else if (type === 'remove') this.dashboardFacade.removeProductToBasket(product);
    this.basket$.subscribe(x =>
      this.dashboardFacade.calculateTaxesInBasket(x)
    ).unsubscribe();
  }

  public continue(basket: Basket): void {
    if (basket.products.length !== 0) {
      this.stepOne = !this.stepOne;
      this.stepTwo = !this.stepTwo;
    } else {
      this.dashboardFacade.sendMessage('Debe seleccionar por lo menos un producto.', NgxNotificationStatusMsg.FAILURE);
    }
  }

  public closeBill() {
    this.stepOne = !this.stepOne;
    this.stepTwo = !this.stepTwo;
  }

  public toggleFreeProduct(product: Product): void {
    const message = '¿Estás seguro de cambiar el producto?';
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
      disableClose: true,
      data: { message }
    });

    this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dashboardFacade.updateProductFromBasket({ ...product, is_free: !product.is_free });
        this.basket$.subscribe(x =>
          this.dashboardFacade.calculateTaxesInBasket(x)
        ).unsubscribe();
      }
    }));
  }

  public newProductValue(product: Product): void {
    const message = '¿Estás seguro de cambiar el valor del producto?';
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
      disableClose: true,
      data: { message }
    });

    this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dashboardFacade.updateProductFromBasket(product);
        this.basket$.subscribe(x =>
          this.dashboardFacade.calculateTaxesInBasket(x)
        ).unsubscribe();
      }
    }));
  }

  public setClient(document: string) {
    this.clients$.subscribe(clients => {
      const client = clients.find(c => c.number_identification === document);
      this.clientForm.patchValue({
        email: client.email,
        firstName: client.name,
        lastName: client.lastname,
        isNew: false
      });
    }).unsubscribe();
  }

  public createBillOrUpdate(): void {
    this.basket$.subscribe(basket => {
      const bill: Bill = {
        id: this.billId,
        client: {
          country_code: this.clientForm.value.countryCode,
          document_type: this.clientForm.value.documentType,
          email: this.clientForm.value.email,
          last_name: this.clientForm.value.lastName,
          name: this.clientForm.value.firstName,
          new: this.clientForm.value.isNew,
          number_identification: this.clientForm.value.identificationNumber,
          phone: +this.clientForm.value.phone
        },
        products: basket.products,
        date: this.clientForm.value.payDate,
        expired_date: this.clientForm.value.billingDate,
      };
      if (this.isUpdatingBill) {
        this.dashboardFacade.updateBill(bill);
      } else {
        this.dashboardFacade.createBill(bill);
      }
      this.closeBill();
    }).unsubscribe();
  }

  public goToPage(page: number): void {
    this.dashboardFacade.fetchProductsInStock(page, '');
  }

  public openUpdateStockModal(product: Product): void {
    const dialogRef = this.dialog.open(ProductsUpdateStockComponent, {
      width: '250px',
      data: { product }
    });

    this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
      if (result) this.dashboardFacade.updateStockOfProduct(result);
    }));
  }
}
