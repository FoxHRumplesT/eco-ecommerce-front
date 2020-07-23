import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.sass']
})
export class ReportComponent implements OnInit {

  public showReport = false;
  public srcFile: string;
  public reportForm: FormGroup;
  public reportType = [
    { value: '1', description: 'Reporte 1' },
    { value: '2', description: 'Reporte 2' }
  ];

  constructor() {
    const { required } = Validators;
    this.reportForm = new FormGroup({
      typeReport: new FormControl('', [required]),
      startDate: new FormControl('', [required]),
      endDate: new FormControl('', [required])
    });
  }

  ngOnInit(): void {
    this.srcFile = 'https://www2.javerianacali.edu.co/sites/ujc/files/normas_apa_revisada_y_actualizada_mayo_2019.pdf';
  }

  public generateReport() {
    this.showReport = true;
  }

  public closeReport() {
    this.showReport = false;
  }
}
