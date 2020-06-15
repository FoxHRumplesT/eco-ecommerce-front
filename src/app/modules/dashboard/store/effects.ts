import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as actions from './actions';
import { DashboardServices } from '../services/dashboard.services';

@Injectable()
export class DashboardEffects {

  constructor(
    private actions$: Actions,
    private services: DashboardServices
  ) {}

  @Effect()
  fetchProducts$: Observable<Action> = this.actions$.pipe(
    ofType(actions.fetchProductsAction),
    switchMap(({ page }) => this.services.fetchProducts$(page).pipe(
      map(response => ({ response: response.result, error: null })),
      catchError(error => of({ error, response: [] })),
    )),
    map(({ response, error }) => actions.fetchProductsSuccessAction({ response }))
  );

  @Effect()
  fetchTaxesAction$: Observable<Action> = this.actions$.pipe(
    ofType(actions.fetchTaxesAction),
    switchMap(_ => this.services.fetchTaxes$().pipe(
      map(response => ({ response: response.result, error: null })),
      catchError(error => of({ error, response: [] })),
    )),
    map(({ response, error }) => actions.fetchTaxesSuccessAction({ response }))
  );

}
