import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { NgxNotificationStatusMsg } from 'ngx-notification-msg';

import { DashboardFacade } from '../../dashboard.facade';
import { Product, Basket, Tax, Result, Client, ProductsResponse } from '../../dashboard.entities';
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


  constructor(
    private dashboardFacade: DashboardFacade
  ) {
    const { required, email, minLength, maxLength } = Validators;
    this.formClient = new FormGroup({
      number_identification: new FormControl('', [required]),
      name: new FormControl(this.client.name, [required]),
      email: new FormControl('', [required, email]),
      phone: new FormControl('', [required, minLength(7), maxLength(10)]),
      billingDate: new FormControl(new Date(), [required]),
      payDate: new FormControl(new Date(), [required]),
      document_type: new FormControl('', [required]),
      lastname: new FormControl('', [required]),
      country_code: new FormControl('+57', [required]),
      new: new FormControl('true', [required]),
      last_name: new FormControl('')
    });

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
  }

  public continue(basket: Basket): void {
    if (basket.products.length !== 0) {
      if (this.stepOne) {
        this.stepOne = !this.stepOne;
        this.stepTwo = !this.stepTwo;
        this.dashboardFacade.calculateTaxesInBasket(basket);
      } else {
        // TODO create bill
      }
    } else {
      this.dashboardFacade.sendMessage('Debe seleccionar por lo menos un producto.', NgxNotificationStatusMsg.FAILURE);
    }
  }

  public toggleFreeProduct(product: Product): void {
    this.dashboardFacade.updateProductFromBasket({ ...product, is_free: !product.is_free });
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
