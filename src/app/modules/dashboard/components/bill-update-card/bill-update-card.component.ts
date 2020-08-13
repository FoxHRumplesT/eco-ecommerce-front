import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Bill, Basket, Product } from '../../dashboard.entities';
import { DashboardFacade } from '../../dashboard.facade';
import { Observable } from 'rxjs';
import { map, find } from 'rxjs/operators';

@Component({
  selector: 'app-bill-update-card',
  templateUrl: './bill-update-card.component.html',
  styleUrls: ['./bill-update-card.component.sass']
})
export class BillUpdateCardComponent implements OnInit {
  public bill = new Bill();

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              public dialogRef: MatDialogRef<BillUpdateCardComponent>,
              private dashboardFacade: DashboardFacade) {
    this.bill = data.bill;
    this.bill.products.forEach(product => {
      this.addProductToBasket(product);
    });
    this.dashboardFacade.setClient(this.bill.client);
  }

  ngOnInit(): void {
  }

  get basket$(): Observable<Basket> {
    return this.dashboardFacade.basket$;
  }

  get products$(): Observable<Product[]> {
    return this.dashboardFacade.products$.pipe(
      map(p => p.results)
    );
  }

  public addProductToBasket(product: Product): void {
    this.products$.subscribe(x => x.forEach(prod => {
      if (prod.code === product.code && prod.lot.replace(/\s/g, '') === product.lot.replace(/\s/g, '')) {
        this.dashboardFacade.addProductToBasket({...prod, quantity: product.quantity, is_free: product.is_free });
      }
    })
    );

    this.basket$.subscribe(x =>
      this.dashboardFacade.calculateTaxesInBasket(x)
    ).unsubscribe();
  }

}
