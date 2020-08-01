import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup} from '@angular/forms';

import { Bill } from '../../dashboard.entities';

@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.sass']
})
export class BillCardComponent implements OnInit {

  public formBill: FormGroup;
  public bill: Bill;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              public dialogRef: MatDialogRef<BillCardComponent>) {
                this.bill = data.bill;
               }

  ngOnInit(): void {
  }

  onCerrar(): void {
    this.dialogRef.close();
  }

}
