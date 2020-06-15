import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.sass']
})
export class BillComponent implements OnInit {

  public rows: { [key: string]: any }[] = [{
    product: 'Austin akjsnkjas daks dkas cj ak dsakj ckna skdajsndkjanks',
    quantity: 'Male',
    value: 'Swimlane',
    taxes: 'asd',
    total: 'gfdgd',
    actions: 'qrwew'
  },
  {
    product: 'Austin',
    quantity: 'Male',
    value: 'Swimlane',
    taxes: 'asd',
    total: 'gfdgd',
    actions: 'qrwew'
  }];

  public columns: { prop: string, name: string }[] = [
    { prop: 'product', name: 'Producto' },
    { prop: 'quantity', name: 'Cantidad' },
    { prop: 'value', name: 'Valor' },
    { prop: 'taxes', name: 'Impuestos' },
    { prop: 'total', name: 'Total' },
    { prop: 'actions', name: 'Acciones' }
  ];

  public mode = ColumnMode;

  constructor() { }

  ngOnInit(): void {
  }

}
