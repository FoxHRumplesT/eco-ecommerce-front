import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { DashboardGuard } from './dashboard.guard';
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
            path: 'productsManagement',
            component: ProductsManagementComponent
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
            path: 'billManagement',
            component: BillManagementComponent
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
