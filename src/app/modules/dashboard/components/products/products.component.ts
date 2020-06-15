import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DashboardFacade } from '../../dashboard.facade';
import { Product, Basket } from '../../dashboard.entities';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {

  constructor(
    private dashboardFacade: DashboardFacade
  ) { }

  ngOnInit(): void {
    this.dashboardFacade.fetchProducts(1);
  }

  get basket$(): Observable<Basket> {
    return this.dashboardFacade.basket$;
  }

  get products$(): Observable<Product[]> {
    return this.dashboardFacade.products$;
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

  public addProductToBasket(product: Product): void {
    this.dashboardFacade.addProductToBasket(product);
  }

  public removeProductToBasket(product: Product): void {
    this.dashboardFacade.removeProductToBasket(product);
  }

}
