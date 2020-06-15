import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, catchError, switchMap } from 'rxjs/operators';

import * as actions from './actions';
import { AuthServices } from '../auth.service';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private services: AuthServices
  ) {}

  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType(actions.loginAction),
    switchMap(({ email, password }) => this.services.login$(email, password).pipe(
      map(response => ({ response, error: null })),
      catchError(error => of({ error, response: null }))
    )),
    map(({ response, error }) => {
      if (!error) {
        localStorage.setItem('t', response);
      }
      return error ?
      actions.loginErrorAction({ error }) :
      actions.loginSuccessAction({ response });
    })
  );
}
