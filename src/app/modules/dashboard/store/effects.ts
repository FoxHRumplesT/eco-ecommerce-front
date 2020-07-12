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
  ) {}

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
    switchMap(({ page }) => this.services.fetchProducts$(page).pipe(
      map(response => ({ response: response.results, error: null })),
      catchError(error => of({ error, response: [] })),
    )),
    map(({ response, error }) => actions.fetchProductsSuccessAction({ response }))
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
    ofType(actions.calculateTaxesInBasket),
    switchMap(({ basket }) => this.services.calculateTaxesInBasket$(basket).pipe(
      map(response => ({ response: response.result, error: null })),
      catchError(error => of({ error, response: [] })),
    )),
    map(({ response, error }) => actions.calculateTaxesInBasketSuccess({ response }))
  );

  @Effect()
  createProduct$: Observable<Action> = this.actions$.pipe(
    ofType(actions.createProductAction),
    switchMap(({ product }) => this.services.createProduct$(product).pipe(
      map(response => ({ response: response.message, error: null })),
      catchError(error => of({ error, response: [] })),
    )),
    map(({ response, error }) => actions.createProductSuccess({ response }))
  );

  @Effect()
  updateProduct$: Observable<Action> = this.actions$.pipe(
    ofType(actions.updateProductAction),
    switchMap(({ product }) => this.services.updateProduct$(product).pipe(
      map(response => ({ response: response.message, error: null })),
      catchError(error => of({ error, response: [] })),
    )),
    map(({ response, error }) => actions.updateProductSuccess({ response }))
  );

  @Effect()
  deleteProduct$: Observable<Action> = this.actions$.pipe(
    ofType(actions.deleteProductAction),
    switchMap(({ product }) => this.services.deleteProduct$(product).pipe(
      map(response => ({ response: response.message, error: null })),
      catchError(error => of({ error, response: [] })),
    )),
    concatMap(({ response, error }) =>
    error === null ? [actions.deleteProductSuccess({ response }), actions.notificationAction({
      msg: 'OK',
      status: NgxNotificationStatusMsg.SUCCESS
    })] : [actions.deleteProductError(), actions.notificationAction({
      msg: 'Fail',
      status: NgxNotificationStatusMsg.FAILURE
    })])
  );

  @Effect()
  loadImage$: Observable<Action> = this.actions$.pipe(
    ofType(actions.loadImageAction),
    switchMap(({ image }) => this.services.loadImage$(image).pipe(
      map(response => ({ response: response.message, error: null })),
      catchError(error => of({ error, response: [] })),
    )),
    map(({ response, error }) => actions.updateProductSuccess({ response }))
  );

}
