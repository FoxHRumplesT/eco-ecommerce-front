import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Bill } from '../../dashboard.entities';

@Component({
  selector: 'app-bill-management-detail',
  templateUrl: './bill-management-detail.component.html',
  styleUrls: ['./bill-management-detail.component.sass']
})
export class BillManagementDetailComponent {

  public bill: Bill;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<BillManagementDetailComponent>
  ) {
    this.bill = data.bill;
  }

  get products(): any {
    return this.bill?.products['summary'];
  }

}
