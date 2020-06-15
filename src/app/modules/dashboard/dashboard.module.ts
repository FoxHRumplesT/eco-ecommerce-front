import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ProductsComponent } from './components/products/products.component';
import { CurrencyFormatPipe } from '../../pipes/currency-format.pipe';
import { BillComponent } from './components/bill/bill.component';
import { DashboardEffects } from './store/effects';
import { DashboardReducers } from './store/reducers';
import { DashboardFacade } from './facades/dashboard.facade';
import { DashboardServices } from './services/dashboard.services';

@NgModule({
  declarations: [
    SidebarComponent,
    DashboardComponent,
    ProductsComponent,
    CurrencyFormatPipe,
    BillComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgxDatatableModule,
    StoreModule.forFeature('dash', DashboardReducers),
    EffectsModule.forFeature([ DashboardEffects ]),
    DashboardRoutingModule
  ],
  providers: [
    DashboardFacade,
    DashboardServices
  ]
})
export class DashboardModule { }
