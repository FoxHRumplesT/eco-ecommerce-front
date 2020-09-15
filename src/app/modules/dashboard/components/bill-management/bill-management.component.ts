import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { MatDialog } from '@angular/material/dialog';
import { map, filter } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { DashboardFacade } from '../../dashboard.facade';
import { Bill, BillsResponse } from '../../dashboard.entities';
import { ModalComponent } from '../modal/modal.component';
import { BillManagementDetailComponent } from '../bill-management-detail/bill-management-detail.component';

@Component({
  selector: 'app-bill-management',
  templateUrl: './bill-management.component.html',
  styleUrls: ['./bill-management.component.sass']
})
export class BillManagementComponent implements OnInit {

  public mode = ColumnMode;
  private subscriptions: Subscription[] = [];

  constructor(
    private dashboardFacade: DashboardFacade,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dashboardFacade.fetchBills(1);
  }

  get bills$(): Observable<any> {
    return this.dashboardFacade.bills$.pipe(
      filter(bills => !!bills && !!bills.results),
      map(bills => bills.results.map(bill => ({
        id: bill.id,
        date: bill.date,
        identificationNumber: bill.client.number_identification,
        client: bill.client,
        total: bill.total,
        products: bill.products
      })))
    );
  }

  get paginatorInfo$(): Observable<BillsResponse> {
    return this.dashboardFacade.bills$;
  }

  public onBillDetail(bill: Bill): void {
    const dialogRef = this.dialog.open(BillManagementDetailComponent, {
      width: '60%',
      disableClose: false,
      data: { bill }
    });
  }

  // public onUpdateBill(bill: Bill): void {
  //   console.log("BillManagementComponent -> onUpdateBill -> bill", bill);
  //   this.router.navigate(['..', 'products', 'bill.id']);
  //   // const dialogRef = this.dialog.open(null, {
  //   //   width: '95%',
  //   //   height: '80%',
  //   //   disableClose: true,
  //   //   data: { bill }
  //   // });

  //   // this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
  //   //   // this.dashboardFacade.cleanBasket();
  //   // }));
  // }

  public onDeleteBill(bill: Bill): void {
    const message = '¿Estás  seguro de eliminar la factura?';
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
      disableClose: true,
      data: { message }
    });

    this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
      if (result) this.dashboardFacade.deleteBill(bill);
    }));
  }


}
