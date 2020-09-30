import { map, switchMap, catchError, concatMap, tap } from 'rxjs/operators';
import { NgxNotificationStatusMsg, NgxNotificationDirection, NgxNotificationMsgService } from 'ngx-notification-msg';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';

import * as actions from './actions';
import { DashboardServices } from '../dashboard.services';


@Injectable()
export class DashboardEffects {

  constructor(
    private actions$: Actions,
    private services: DashboardServices,
    private router: Router,
    private notificationService: NgxNotificationMsgService
  ) { }

  @Effect({ dispatch: false })
  notificationAction$: Observable<void> = this.actions$.pipe(
    ofType(actions.notificationAction),
    map(({ msg, status }) => {
      this.notificationService.open({
        msg, status,
        displayIcon: true,
        displayProgressBar: true,
        direction: NgxNotificationDirection.BOTTOM_RIGHT,
      });
    })
  );

  @Effect()
  fetchProducts$: Observable<Action> = this.actions$.pipe(
    ofType(actions.fetchProductsAction),
    switchMap(({ page, keyword }) => this.services.fetchProducts$(page, keyword).pipe(
      map(response => ({ response, error: null })),
      catchError(error => of({ error, response: null })),
    )),
    map(({ response, error }) => actions.fetchProductsSuccessAction({ response }))
  );

  @Effect()
  fetchProductsInStock$: Observable<Action> = this.actions$.pipe(
    ofType(actions.fetchProductsInStockAction),
    switchMap(({ page, keyword }) => this.services.fetchProductsInStock$(page, keyword).pipe(
      map(response => ({ response, error: null })),
      catchError(error => of({ error, response: null })),
    )),
    map(({ response, error }) => actions.fetchProductsInStockSuccessAction({ response }))
  );

  @Effect()
  fetchTaxesAction$: Observable<Action> = this.actions$.pipe(
    ofType(actions.fetchTaxesAction),
    switchMap(_ => this.services.fetchTaxes$().pipe(
      map(response => ({ response: response.results, error: null })),
      catchError(error => of({ error, response: [] })),
    )),
    map(({ response, error }) => actions.fetchTaxesSuccessAction({ response }))
  );

  @Effect()
  calculateTaxesInBasket$: Observable<Action> = this.actions$.pipe(
    ofType(actions.calculateTaxesInBasketAction),
    switchMap(({ basket }) => this.services.calculateTaxesInBasket$(basket).pipe(
      map(response => ({ response: response.result, error: null })),
      catchError(error => of({ error, response: [] })),
    )),
    map(({ response, error }) => actions.calculateTaxesInBasketSuccessAction({ response }))
  );

  @Effect()
  createProduct$: Observable<Action> = this.actions$.pipe(
    ofType(actions.createProductAction),
    switchMap(({ product, formDataToUploadImage }) => this.services.uploadImage$(formDataToUploadImage).pipe(
      map(response => ({ product: { ...product, url_image: response.message }, error: null })),
      catchError(error => of({ error, product: { ...product, url_image: '' } })),
    )),
    switchMap(({ product }) => this.services.createProduct$(product).pipe(
      map(response => ({ response: response.message, error: null })),
      catchError(error => of({ error, response: null })),
    )),
    concatMap(({ response, error }) => !error ? [
      actions.notificationAction({ msg: 'Producto creado!', status: NgxNotificationStatusMsg.SUCCESS }),
      actions.fetchProductsAction({ page: 1, keyword: '' })
    ] : [
        actions.notificationAction({ msg: 'Ocurrio un error!', status: NgxNotificationStatusMsg.FAILURE }),
      ])
  );

  @Effect()
  updateProduct$: Observable<Action> = this.actions$.pipe(
    ofType(actions.updateProductAction),
    switchMap(({ product, formDataToUploadImage }) => this.services.uploadImage$(formDataToUploadImage).pipe(
      map(response => ({ product: { ...product, url_image: response.message }, error: null })),
      catchError(error => of({ error, product: { ...product, url_image: product.urlImage } })),
    )),
    switchMap(({ product }) => this.services.updateProduct$(product).pipe(
      map(response => ({ response: response.message, error: null })),
      catchError(error => of({ error, response: null })),
    )),
    concatMap(({ response, error }) => !error ? [
      actions.notificationAction({ msg: 'Producto editado!', status: NgxNotificationStatusMsg.SUCCESS }),
      actions.fetchProductsAction({ page: 1, keyword: '' })
    ] : [
        actions.notificationAction({ msg: 'Ocurrio un error!', status: NgxNotificationStatusMsg.FAILURE }),
      ])
  );

  @Effect()
  deleteProduct$: Observable<Action> = this.actions$.pipe(
    ofType(actions.deleteProductAction),
    switchMap(({ product }) => this.services.deleteProduct$(product).pipe(
      map(response => ({ response: response.message, error: null })),
      catchError(error => of({ error, response: [] })),
    )),

    concatMap(({ response, error }) => !error ? [
      actions.deleteProductSuccessAction({ response }),
      actions.fetchProductsAction({ page: 1, keyword: '' }),
      actions.notificationAction({ msg: 'Producto eliminado', status: NgxNotificationStatusMsg.SUCCESS })
    ] : [
        actions.deleteProductErrorAction(),
        actions.notificationAction({ msg: 'Ocurrio un error al eliminar', status: NgxNotificationStatusMsg.FAILURE })
      ]
    )
  );

  @Effect()
  fetchIDNumber$: Observable<Action> = this.actions$.pipe(
    ofType(actions.fetchIDNumberAction),
    switchMap(({ idNumber }) => this.services.fetchIDNumber$(idNumber).pipe(
      map(response => ({ response: response.result, error: null })),
      catchError(error => of({ error, response: [] })),
    )),
    map(({ response, error }) => actions.fetchIDNumberSuccessAction({ response }))
  );

  @Effect()
  fetchBills$: Observable<Action> = this.actions$.pipe(
    ofType(actions.fetchBillsAction),
    switchMap(({ page }) => this.services.fetchBills$(page).pipe(
      map(response => ({ response, error: null })),
      catchError(error => of({ error, response: null })),
    )),
    map(({ response, error }) => !error ?
      actions.fetchBillsSuccessAction({ response }) :
      actions.fetchBillsErrorAction()
    )
  );

  @Effect()
  createBill$: Observable<Action> = this.actions$.pipe(
    ofType(actions.createBillAction),
    switchMap(({ bill }) => bill.client.new ? this.services.createClient$(bill.client).pipe(
      map(response => ({ bill })),
      catchError(() => of({ bill }))
    ) : of(({ bill }))),
    switchMap(({ bill }) => this.services.createBill$(bill).pipe(
      map(response => ({ response, error: null })),
      catchError(error => of({ error, response: [] })),
    )),
    concatMap(({ response, error }) => error === null ? [
      actions.createBillSuccessAction({ response }),
      actions.fetchProductsInStockAction({ page: 1, keyword: '' }),
      actions.resetBasketAction(),
      actions.notificationAction({
        msg: 'Factura creada satisfactoriamente.',
        status: NgxNotificationStatusMsg.SUCCESS
      }),
    ] : [
        actions.createBillErrorAction(),
        actions.notificationAction({
          msg: 'Ocurrio un error al generar factura.',
          status: NgxNotificationStatusMsg.FAILURE
        })
      ])
  );

  @Effect()
  deleteBill$: Observable<Action> = this.actions$.pipe(
    ofType(actions.deleteBillAction),
    switchMap(({ bill }) => this.services.deleteBill$(bill).pipe(
      map(response => ({ response: response.message, error: null })),
      catchError(error => of({ error, response: [] })),
    )),

    concatMap(({ response, error }) => !error ? [
      actions.deleteBillSuccessAction({ response }),
      actions.fetchBillsAction({ page: 1 }),
      actions.notificationAction({ msg: 'Factura eliminada', status: NgxNotificationStatusMsg.SUCCESS })
    ] : [
        actions.deleteBillErrorAction(),
        actions.notificationAction({ msg: 'Ocurrio un error al eliminar', status: NgxNotificationStatusMsg.FAILURE })
      ]
    )
  );

  @Effect()
  updateBill$: Observable<Action> = this.actions$.pipe(
    ofType(actions.updateBillAction),
    switchMap(({ bill }) => this.services.updateBill$(bill).pipe(
      map(response => ({ response: response.message, error: null })),
      catchError(error => of({ error, response: null })),
    )),
    tap(_ => this.router.navigate(['bill-management'])),
    concatMap(({ response, error }) => !error ? [
      actions.notificationAction({ msg: 'Factura editada!', status: NgxNotificationStatusMsg.SUCCESS }),
    ] : [
        actions.notificationAction({ msg: 'Ocurrio un error!', status: NgxNotificationStatusMsg.FAILURE }),
      ])
  );

  @Effect()
  updateStockProductAction$: Observable<Action> = this.actions$.pipe(
    ofType(actions.updateStockProductAction),
    switchMap(({ payload }) => this.services.updateStockProduct$(payload).pipe(
      map(response => ({ response, error: null })),
      catchError(error => of({ error, response: null })),
    )),
    concatMap(({ response, error }) => !error ? [
      actions.fetchProductsInStockAction({ page: 1, keyword: '' }),
      actions.notificationAction({ msg: 'Stock editado!', status: NgxNotificationStatusMsg.SUCCESS }),
    ] : [
        actions.notificationAction({ msg: 'Ocurrio un error!', status: NgxNotificationStatusMsg.FAILURE }),
      ])
  );

  @Effect()
  fetchReportTypesAction$: Observable<Action> = this.actions$.pipe(
    ofType(actions.fetchReportTypesAction),
    switchMap(action => this.services.fetchReportTypes$().pipe(
      map(response => ({ response, error: null })),
      catchError(error => of({ error, response: null }))
    )),
    map(({ response, error }) => !error ?
      actions.fetchReportTypesSuccessAction({ response }) :
      actions.fetchReportTypesErrorAction()
    )
  );

  @Effect()
  generateDatesReportAction$: Observable<Action> = this.actions$.pipe(
    ofType(actions.generateDatesReportAction),
    switchMap(({ start, end }) => this.services.generateDatesReport$(start, end).pipe(
      map(response => ({ response, error: null })),
      catchError(error => of({ error, response: null }))
    )),
    map(({ response, error }) => !error ?
      actions.generateDatesReportSuccessAction({ response }) :
      actions.generateDatesReportErrorAction()
    )
  );

}
