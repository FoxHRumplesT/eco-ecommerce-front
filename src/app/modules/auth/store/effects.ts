import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, catchError, switchMap, concatMap } from 'rxjs/operators';
import {
  NgxNotificationMsgService, NgxNotificationDirection, NgxNotificationStatusMsg
} from 'ngx-notification-msg';

import * as actions from './actions';
import { AuthServices } from '../auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private router: Router,
    private services: AuthServices,
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
  login$: Observable<Action> = this.actions$.pipe(
    ofType(actions.loginAction),
    switchMap(({ email, password }) => this.services.login$(email, password).pipe(
      map(response => ({ response, error: null })),
      catchError(error => of({ error, response: null }))
    )),
    concatMap(({ response, error }) => {
      if (!error) {
        sessionStorage.setItem('t', response);
        this.router.navigate(['/dashboard']);
      }
      return error ?
        [
          actions.notificationAction({
            msg: 'Usuario o contraseña invalido',
            status: NgxNotificationStatusMsg.FAILURE
          }),
          actions.loginErrorAction({ error })
        ] : [
          actions.loginSuccessAction({ response })
        ];
    })
  );
}
