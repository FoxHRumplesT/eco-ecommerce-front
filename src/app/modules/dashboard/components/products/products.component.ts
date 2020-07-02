import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DashboardFacade } from '../../dashboard.facade';
import { Product, Basket, Tax } from '../../dashboard.entities';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
    if (this.stepOne) {
      this.stepOne = !this.stepOne;
      this.stepTwo = !this.stepTwo;
      this.dashboardFacade.calculateTaxesInBasket(basket);
    } else {
      this.dashboardFacade.calculateTaxesInBasket(basket);
    }
  }

}
