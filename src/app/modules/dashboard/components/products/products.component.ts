import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DashboardFacade } from '../../dashboard.facade';
import { Product, Basket, Tax, Result } from '../../dashboard.entities';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { newArray } from '@angular/compiler/src/util';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {

  public stepOne = true;
  public stepTwo = false;

  public formClient: FormGroup;

  constructor(
    private dashboardFacade: DashboardFacade
  ) {
    const { required, email, minLength, maxLength } = Validators;
    this.formClient = new FormGroup({
      document: new FormControl('', [required]),
      name: new FormControl('', [required]),
      email: new FormControl('', [required, email]),
      phone: new FormControl('', [required, minLength(7), maxLength(10)]),
      billingDate: new FormControl('', [required]),
      payDate: new FormControl('', [required])
    });
  }

  ngOnInit(): void {
    this.dashboardFacade.fetchProducts(1);
  }

  get basket$(): Observable<Basket> {
    return this.dashboardFacade.basket$;
  }

  get products$(): Observable<Product[]> {
    return this.dashboardFacade.products$;
  }

  get taxes$(): Observable<Tax[]> {
    return this.dashboardFacade.taxes$;
  }

  get result$(): Observable<Result> {
    return this.dashboardFacade.result$;
  }

  public differentProducts(products: Product[]): Product[] {
    return products.filter((product, index, self) =>
      index === self.findIndex((t) => t.id === product.id)
    );
  }

  public total(basket: Basket): number {
    let total = 0;
    basket.products.forEach(product => {
      total += product.value;
    });
    return total;
  }

  public addRemoveProductToBasket(type: string, product: Product): void {
    if (type === 'add') this.dashboardFacade.addProductToBasket(product);
    else if (type === 'remove') this.dashboardFacade.removeProductToBasket(product);
  }

  public continue(basket: Basket): void {
    const lstProduct = new Array();
    const newBasket = new Basket();
    basket.products.forEach(element => {
      if (lstProduct === undefined || !lstProduct.some(x => x.id === element.id)) {
        const product = new Product();
        const check = document.getElementById(element.id.toString()) as HTMLInputElement;
        //product.id = element.id;
        product.code = element.code;
        product.quantity = basket.products.filter(pr => pr.id === element.id).length;
        product.lot = element.lot;
        product.value = element.value;
        product.is_free = check.checked;
        lstProduct.push(product);
      }
    });
    newBasket.products = lstProduct;
    if (this.stepOne) {
      this.stepOne = !this.stepOne;
      this.stepTwo = !this.stepTwo;
      this.dashboardFacade.calculateTaxesInBasket(newBasket);
    } else {
      this.dashboardFacade.calculateTaxesInBasket(basket);
    }
  }
}
