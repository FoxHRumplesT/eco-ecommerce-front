import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { NgxNotificationStatusMsg } from 'ngx-notification-msg';

import { DashboardFacade } from '../../dashboard.facade';
import { Product, Basket, Tax, Result, Client, ProductsResponse, Bill, BillResponse } from '../../dashboard.entities';
import { Constants } from '../../dashboard.constants';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit, OnDestroy {
  public stepOne = true;
  public stepTwo = false;
  public typeDocument = [
    { value: 'cc', description: 'Cédula' },
    { value: 'nit', description: 'Nit' },
    { value: 'ce', description: 'Extranjería' },
    { value: 'pp', description: 'Pasaporte' }
  ];
  public selectetTypeDoc = this.typeDocument[0].value;
  public formClient: FormGroup;
  public formSearch: FormGroup;
  private client = new Client();
  public newClient = true;
  private subscriptions: Subscription[] = [];
  public isUpdateBill = false;
  public actionButtonBill = 'Crear factura';


  constructor(
    private dashboardFacade: DashboardFacade
  ) {
    const { required, email, minLength, maxLength } = Validators;
    this.dashboardFacade.client$.subscribe(x => this.client = x);
    if (this.client.name !== undefined) {
      this.isUpdateBill = true;
      this.newClient = false;
      this.dashboardFacade.setEnabledBillButton(true);
      this.actionButtonBill = 'Modificar factura';
    }
    this.formClient = new FormGroup({
      number_identification: new FormControl('', [required]),
      name: new FormControl(this.client.name, [required]),
      email: new FormControl(this.client.email, [required, email]),
      phone: new FormControl(this.client.phone, [required, minLength(7), maxLength(10)]),
      billingDate: new FormControl(new Date(), [required]),
      payDate: new FormControl(new Date(), [required]),
      document_type: new FormControl(this.client.document_type, [required]),
      lastname: new FormControl(this.client.last_name, [required]),
      country_code: new FormControl('+57', [required]),
      new: new FormControl('true', [required]),
      last_name: new FormControl(this.client.last_name)
    });
    this.formClient.controls.number_identification.setValue({number_identification : this.client.number_identification});
    this.formSearch = new FormGroup({
      keyword: new FormControl()
    });
  }

  ngOnInit(): void {
    this.dashboardFacade.fetchProductsInStock(1, '');
    this.subscriptions.push(
      this.formClient.controls.number_identification.valueChanges.pipe(
        debounceTime(Constants.debounceTime))
        .subscribe(
          value => {
            this.dashboardFacade.fetchIDNumber(value);
          }
        )
    );
    this.subscriptions.push(
      this.formSearch.controls.keyword.valueChanges.pipe(
        debounceTime(Constants.debounceTime))
        .subscribe(
          value => {
            this.dashboardFacade.fetchProductsInStock(1, value);
          }
        )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }


  get basket$(): Observable<Basket> {
    return this.dashboardFacade.basket$;
  }

  get products$(): Observable<Product[]> {
    return this.dashboardFacade.products$.pipe(
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
      if (this.stepOne) {
        this.stepOne = !this.stepOne;
        this.stepTwo = !this.stepTwo;
      } else {
        this.formClient.controls.last_name.setValue(this.formClient.controls.lastname.value);
        this.formClient.controls.new.setValue(false);
        const actualDate = new Date();
        const bill: Bill = {
        client: this.formClient.value,
        products: basket.products,
        date: actualDate,
        expired_date: actualDate,
        id: null,
        paid: null,
        tax: null,
        total: null,
        total_products: null
        };
        if (!this.newClient) {
          bill.client.number_identification = this.formClient.controls.number_identification.value.number_identification;
        }
        if (this.isUpdateBill) {
          this.dashboardFacade.updateBill(bill);
        }
        else {
          this.dashboardFacade.createBill(bill);
        }
      }
    } else {
      this.dashboardFacade.sendMessage('Debe seleccionar por lo menos un producto.', NgxNotificationStatusMsg.FAILURE);
    }
  }

  public toggleFreeProduct(product: Product): void {
    this.dashboardFacade.updateProductFromBasket({ ...product, is_free: !product.is_free });
  }

  public newProductValue(product: Product): void {
    this.dashboardFacade.updateProductFromBasket(product);
    this.basket$.subscribe(x =>
      this.dashboardFacade.calculateTaxesInBasket(x)
      ).unsubscribe();
  }

  public createClient() {
    this.formClient.controls.phone.setValue(Number(this.formClient.controls.phone.value));
    this.formClient.controls.last_name.setValue(this.formClient.controls.lastname.value);
    this.dashboardFacade.createClient(this.formClient.value);
  }

  public displayIDClient(client: Client) {
    if (client) {
      return client.number_identification;
    }
  }
  public setClient(client: Client) {
    this.formClient.controls.name.setValue(client.name);
    this.formClient.controls.lastname.setValue(client.lastname);
    this.formClient.controls.email.setValue(client.email);
    this.formClient.controls.new.setValue(false);
    this.dashboardFacade.setEnabledBillButton(true);
    this.newClient = false;
  }

  get validateBillButton$(): Observable<boolean> {
    return this.dashboardFacade.isEnabledBillButton$.pipe(
      map(isEnabledBillButton =>
        (this.stepTwo && this.formClient.invalid) ||
        (this.stepTwo && !isEnabledBillButton)
      ));
  }
  public closeBill() {
    this.stepOne = !this.stepOne;
    this.stepTwo = !this.stepTwo;
  }
}
