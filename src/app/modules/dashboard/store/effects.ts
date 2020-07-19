import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, switchMap, catchError, concatMap } from 'rxjs/operators';

import * as actions from './actions';
import { DashboardServices } from '../dashboard.services';
import { NgxNotificationStatusMsg, NgxNotificationDirection, NgxNotificationMsgService } from 'ngx-notification-msg';


@Injectable()
export class DashboardEffects {

  constructor(
    private actions$: Actions,
    private services: DashboardServices,
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
      map(response => ({ response: response.results, error: null })),
      catchError(error => of({ error, response: [] })),
    )),
    map(({ response, error }) => actions.fetchProductsSuccessAction({ response }))
  );

  @Effect()
  fetchProductsInStock$: Observable<Action> = this.actions$.pipe(
    ofType(actions.fetchProductsInStockAction),
    switchMap(({ page, keyword }) => this.services.fetchProductsInStock$(page, keyword).pipe(
      map(response => ({ response: response.results, error: null })),
      catchError(error => of({ error, response: [] })),
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
      map(response => ({ product: { ...product, urlImage: response.message }, error: null })),
      catchError(error => of({ error, product: { ...product, urlImage: '' } })),
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
    switchMap(({ product }) => this.services.updateProduct$(product).pipe(
      map(response => ({ response: response.message, error: null })),
      catchError(error => of({ error, response: [] })),
    )),
    map(({ response, error }) => actions.updateProductSuccessAction({ response }))
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
      actions.notificationAction({ msg: 'Producto eliminado', status: NgxNotificationStatusMsg.SUCCESS })
    ] : [
        actions.deleteProductErrorAction(),
        actions.notificationAction({ msg: 'Ocurrio un error al eliminar', status: NgxNotificationStatusMsg.FAILURE })
      ]
    )
  );

  @Effect()
  createClient$: Observable<Action> = this.actions$.pipe(
    ofType(actions.createClientAction),
    switchMap(({ client }) => this.services.createClient$(client).pipe(
      map(response => ({ response: response.message, error: null })),
      catchError(error => of({ error, response: [] })),
    )),
    concatMap(({ response, error }) =>
      error === null ? [actions.createClientSuccessAction({ response }),
      actions.setEnableBillButtonAction({ state: true }),
      actions.notificationAction({
        msg: 'Cliente creado satisfactoriamente.',
        status: NgxNotificationStatusMsg.SUCCESS
      })] : [actions.createClientErrorAction(),
      actions.setEnableBillButtonAction({ state: false }),
      actions.notificationAction({
        msg: error.error.message,
        status: NgxNotificationStatusMsg.FAILURE
      })])
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
}
