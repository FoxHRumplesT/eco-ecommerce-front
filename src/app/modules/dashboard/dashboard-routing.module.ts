import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { BillComponent } from './components/bill/bill.component';
import { DashboardGuard } from './dashboard.guard';
import { ProductsManagementComponent } from './components/products-management/products-management.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
        canActivate: [DashboardGuard],
        children: [
          {
            path: 'products',
            component: ProductsComponent
          },
          {
            path: 'productsManagement',
            component: ProductsManagementComponent
          },
          {
            path: 'bill',
            component: BillComponent
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'products'
          }
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
