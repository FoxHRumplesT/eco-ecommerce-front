import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DashboardFacade } from '../../facades/dashboard.facade';
import { Product } from '../../entities/dashboard.entities';

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

  get products$(): Observable<Product[]> {
    return this.dashboardFacade.products$;
  }

}
