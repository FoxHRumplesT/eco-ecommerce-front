import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { loginAction } from './actions';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions
  ) {}

  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType(loginAction),
    map(action => null)
  );
}
