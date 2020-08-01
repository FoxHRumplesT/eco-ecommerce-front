import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { Subscription, Observable } from 'rxjs';
import { DashboardFacade } from '../../dashboard.facade';
import { BillCardComponent } from '../bill-card/bill-card.component';
import { Bill } from '../../dashboard.entities';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-bill-management',
  templateUrl: './bill-management.component.html',
  styleUrls: ['./bill-management.component.sass']
})
export class BillManagementComponent implements OnInit {

  public mode = ColumnMode;
  private subscriptions: Subscription[] = [];

  constructor(public dialog: MatDialog,
              private dashboardFacade: DashboardFacade) { }

  ngOnInit(): void {
    this.dashboardFacade.fetchBills$(1);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  get bills$(): Observable<Bill[]> {
    return this.dashboardFacade.bills$.pipe(
      map(p => p.results)
    );
  }

  public onBillDetail(row): void {
    const title = 'Detalle Factura';
    const dialogRef = this.dialog.open(BillCardComponent, {
      width: '60%',
      disableClose: true,
      data: { title, bill: row }
    });

    this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
    }));
  }

  public onUpdateBill(row): void {

  }

  public onDeleteBill(row): void {
    const message = '¿Estás  seguro de eliminar la factura numero ' + row.id + '?';
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
      disableClose: true,
      data: { message }
    });

    this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
      if (result) this.dashboardFacade.deleteBill$(row);
    }));
  }
}
