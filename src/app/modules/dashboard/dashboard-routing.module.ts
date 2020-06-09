import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { BillComponent } from './components/bill/bill.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
        children: [
          {
            path: 'products',
            component: ProductsComponent
          },
          {
            path: 'bill',
            component: BillComponent
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
