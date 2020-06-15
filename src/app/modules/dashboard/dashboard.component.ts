import { Component, OnInit } from '@angular/core';

import { DashboardFacade } from './facades/dashboard.facade';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  constructor(
    private dashboardFacade: DashboardFacade
  ) { }

  ngOnInit(): void {
    this.dashboardFacade.fetchTaxes();
  }

}
