import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardGuard } from './dashboard.guard';
import { DashboardComponent } from './dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductsManagementComponent } from './components/products-management/products-management.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ReportComponent } from './components/report/report.component';
import { BillManagementComponent } from './components/bill-management/bill-management.component';

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
            path: 'products/:billId',
            component: ProductsComponent
          },
          {
            path: 'product-management',
            component: ProductsManagementComponent
          },
          {
            path: 'bill-management',
            component: BillManagementComponent
          },
          {
            path: 'payment',
            component: PaymentComponent
          },
          {
            path: 'report',
            component: ReportComponent
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
