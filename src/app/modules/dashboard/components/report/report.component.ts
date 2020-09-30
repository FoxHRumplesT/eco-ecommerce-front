import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { DashboardFacade } from '../../dashboard.facade';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.sass']
})
export class ReportComponent implements OnInit {

  public showReport = false;
  public selectedType: string;
  public datesForm: FormGroup;
  public textForm: FormGroup;
  public url = '';

  constructor(
    private facade: DashboardFacade
  ) {
    const { required } = Validators;
    this.datesForm = new FormGroup({
      startDate: new FormControl('', [required]),
      endDate: new FormControl('', [required])
    });
    this.textForm = new FormGroup({
      text: new FormControl('', [required])
    });
  }

  public ngOnInit(): void {
    this.facade.fetchReportTypes();
  }

  get reportTypes$(): Observable<any> {
    return this.facade.reportTypes$;
  }

  public changeReportType(e: any): void {
    this.selectedType = e.type;
  }

  public generateDatesReport(): void {
    const { startDate, endDate } = this.datesForm.value;
    const start = new Date(startDate).toISOString().split('T')[0];
    const end = new Date(endDate).toISOString().split('T')[0];
    this.url = `https://blitzreport.azurewebsites.net/e-bill/Bill.aspx?startDate=${start}&endDate=${end}`;
    console.log("ReportComponent -> generateDatesReport -> this.url", this.url)
    this.showReport = true;
  }

  public generateTextReport(): void {
    this.url = `https://blitzreport.azurewebsites.net/e-bill/Bill.aspx?id=${this.textForm.value.text}`;
    console.log("ReportComponent -> generateTextReport -> this.url", this.url)
    this.showReport = true;
    // this.facade.generateTextReport(this.textForm.value.text);
  }

  public closeReport() {
    this.showReport = false;
  }
}
