import { Component, OnInit } from '@angular/core';
import { NgxNotificationStatusMsg } from 'ngx-notification-msg';

import { DashboardFacade } from '../../dashboard.facade';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.sass']
})
export class PaymentComponent {
  public previewImageURL: string | ArrayBuffer;
  public uploadedImage: File;
  constructor(
    private dashboardFacade: DashboardFacade,
  ) { }


  public setImagePreview(files: FileList): void {
    if (!files.length) return;

    const mimeType = files[0].type;
    if (!mimeType.match(/image\/*/)) {
      this.dashboardFacade.sendMessage('El archivo debe ser una imagen', NgxNotificationStatusMsg.FAILURE);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.previewImageURL = reader.result;
    };
    this.uploadedImage = files.item(0);
  }

  public uploadFile() {

  }

  get validateUploadButton(): boolean {
    return this.previewImageURL === undefined;
  }
}
