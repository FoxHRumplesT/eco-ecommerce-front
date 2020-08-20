import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DashboardFacade } from './dashboard.facade';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  constructor(
    private dashboardFacade: DashboardFacade,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dashboardFacade.fetchTaxes();
  }

  public logout(): void {
    sessionStorage.removeItem('t');
    this.router.navigate(['/']);
  }

}
