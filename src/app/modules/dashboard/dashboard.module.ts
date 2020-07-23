import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DomSanitizerPipe } from 'src/app/pipes/domSanitizer.pipe';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ProductsComponent } from './components/products/products.component';
import { CurrencyFormatPipe } from '../../pipes/currency-format.pipe';
import { BillComponent } from './components/bill/bill.component';
import { DashboardEffects } from './store/effects';
import { DashboardReducers } from './store/reducers';
import { DashboardFacade } from './dashboard.facade';
import { DashboardServices } from './dashboard.services';
import { DashboardGuard } from './dashboard.guard';
import { ProductsCardComponent } from './components/products-card/products-card.component';
import { ProductsBasketCardComponent } from './components/products-basket-card/products-basket-card.component';
import { ProductsManagementComponent } from './components/products-management/products-management.component';
import { ModalComponent } from './components/modal/modal.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ReportComponent } from './components/report/report.component';

@NgModule({
  declarations: [
    SidebarComponent,
    DashboardComponent,
    ProductsComponent,
    CurrencyFormatPipe,
    BillComponent,
    ProductsCardComponent,
    ProductsBasketCardComponent,
    ProductsManagementComponent,
    ModalComponent,
    PaginatorComponent,
    PaymentComponent,
    ReportComponent,
    DomSanitizerPipe
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgxDatatableModule,
    StoreModule.forFeature('dash', DashboardReducers),
    EffectsModule.forFeature([ DashboardEffects ]),
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule,
    DashboardRoutingModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule
  ],
  providers: [
    DashboardFacade,
    DashboardServices,
    DashboardGuard,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class DashboardModule { }
