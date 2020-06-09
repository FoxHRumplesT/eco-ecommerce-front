import { Component, OnInit } from '@angular/core';

import { DashboardFacade } from '../../facades/dashboard.facade';

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

}
